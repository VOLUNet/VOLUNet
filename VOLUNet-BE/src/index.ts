import { Hono } from "hono";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users, volunteers, userVolunteers } from "./db/schema";
import { eq, lt } from "drizzle-orm";
import { cors } from "hono/cors";
import { userSeed } from "./db/seed/users";
import { volunteerSeed } from "./db/seed/volunteers";

type Bindings = {
  DB: DrizzleD1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/health", (c) => {
  return c.json({ message: "service up" });
});

// ── シード用API ─────────────────────────────────────────
app.get("/seed", async (c) => {
  const db = drizzle(c.env.DB);

  try {
    await Promise.all([
      db.insert(users).values(userSeed),
      db.insert(volunteers).values(volunteerSeed),
    ]);
    return c.json({ message: "シードを正しく挿入出来ました。" });
  } catch (e: any) {
    console.log(e.stack);
    c.status(500);
    return c.json("シードを正しく挿入出来ませんでした。");
  }
});

// ── 型定義 ─────────────────────────────────────────────
interface volunteerPost {
  organizationName: string;
  category: "EnvironmentProtection" | "Welfare" | "CommunityActivity";
  locationImageUrl: string;
  volunteerName: string;
  location: string;
  eventDate: Date;
  maxPeople: number;
  description: string;
  userId: number;
}

interface volunteerRegistration {
  userId: string;
  volunteerId: string;
}

// ── ボランティア登録用API (POST /volunteer) ────────────
app.post("/volunteer", async (c) => {
  const db = drizzle(c.env.DB);
  const raw = await c.req.json();
  const body = {
    ...(raw as any),
    eventDate: new Date((raw as any).eventDate),
  } as volunteerPost;

  try {
    await db.insert(volunteers).values({
      organizerName: body.organizationName,
      locationImageUrl: body.locationImageUrl,
      volunteerName: body.volunteerName,
      category: body.category,
      location: body.location,
      eventDate: body.eventDate,
      currentPeople: 0,
      maxPeople: body.maxPeople,
      description: body.description,
    });
    return c.json({ message: "ボランティアデータを正常に登録しました。" });
  } catch (e: any) {
    console.error(e.stack);
    c.status(500);
    return c.json("ボランティアデータを正常に登録出来ませんでした。");
  }
});

// ── ボランティアリスト検索API (GET /volunteer-list) ──────
app.get("/volunteer-list", async (c) => {
  const db = drizzle(c.env.DB);
  const studentSide = c.req.query("student") === "true";
  const previous = c.req.query("previous") === "true";

  try {
    let results = await db.select().from(volunteers);
    if (studentSide) {
      results = await db
        .select()
        .from(volunteers)
        .where(eq(volunteers.isSharedToStudents, true));
    } else if (previous) {
      results = await db
        .select()
        .from(volunteers)
        .where(lt(volunteers.eventDate, new Date()));
    }

    return c.json(
      results.map((r) => ({
        id: r.id,
        volunteerName: r.volunteerName,
        description: r.description,
        organizationName: r.organizerName,
        eventDate: r.eventDate,
        location: r.location,
      }))
    );
  } catch (e: any) {
    console.error(e.stack);
    c.status(500);
    return c.json("ボランティアデータを正常に取得出来ませんでした。");
  }
});

// ── ボランティア単体取得API (GET /volunteer/:id) ─────────
app.get("/volunteer/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = Number(c.req.param("id"));

  try {
    const vol = await db.select().from(volunteers).where(eq(volunteers.id, id));
    if (vol.length === 0) {
      c.status(404);
      return c.json({ error: "ボランティアイベントが見つかりません。" });
    }

    const uv = await db
      .select()
      .from(userVolunteers)
      .where(eq(userVolunteers.volunteerId, id));
    if (uv.length === 0) {
      c.status(404);
      return c.json({ error: "該当ボランティアへの参加者が見つかりません。" });
    }

    const usr = await db
      .select()
      .from(users)
      .where(eq(users.id, uv[0].userId));
    if (usr.length === 0) {
      c.status(404);
      return c.json({ error: "主催者ユーザーが見つかりません。" });
    }

    return c.json({
      category: vol[0].category,
      locationImageUrl: vol[0].locationImageUrl,
      volunteerName: vol[0].volunteerName,
      eventDate: vol[0].eventDate,
      location: vol[0].location,
      currentPeople: vol[0].currentPeople,
      maxPeople: vol[0].maxPeople,
      organizationName: vol[0].organizerName,
      organizer: usr[0].name,
    });
  } catch (e: any) {
    console.error(e.stack);
    c.status(500);
    return c.json("ボランティアデータを正常に取得出来ませんでした。");
  }
});

// ── ボランティア共有状態変更API (PUT /volunteer/:id) ────
app.put("/volunteer/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = Number(c.req.param("id"));

  try {
    await db
      .update(volunteers)
      .set({ isSharedToStudents: true })
      .where(eq(volunteers.id, id));
    return c.json({ message: "共有フラグを更新しました。" });
  } catch (e: any) {
    console.error(e.stack);
    c.status(500);
    return c.json("共有フラグの更新に失敗しました。");
  }
});

// ── ボランティア参加登録API (PUT /volunteer-registrations) ──
app.put("/volunteer-registrations", async (c) => {
  const db = drizzle(c.env.DB);
  const raw = await c.req.json();
  const userId = Number((raw as any).userId);
  const volunteerId = Number((raw as any).volunteerId);
  if (Number.isNaN(userId) || Number.isNaN(volunteerId)) {
    c.status(400);
    return c.json({ error: "userId または volunteerId が不正です。" });
  }

  try {
    await db.insert(userVolunteers).values({ userId, volunteerId });
    return c.json({ message: "紐づけ完了しました。" });
  } catch (e: any) {
    console.error(e.stack);
    c.status(500);
    return c.json("紐づけに失敗しました。");
  }
});

export default app;
