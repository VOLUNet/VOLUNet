import { Hono } from "hono";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users, volunteers, userVolunteers } from "./db/schema";
import { eq } from "drizzle-orm";

type Bindings = {
  DB: DrizzleD1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/health", (c) => {
  return c.json({
    message: "service up",
  });
});

interface volunteerPost {
  organizationName: string;
  category: "EnvironmentProtection" | "Welfare" | "CommunityActivity";
  locationImageUrl: string;
  volunteerName: string;
  location: string;
  eventDate: Date;
  numPeople: number;
  description: string;
  userId: number;
}

// ボランティア登録用API
app.post("/volunteer", async (c) => {
  const db = drizzle(c.env.DB);
  const body = c.req.json() as unknown as volunteerPost;

  try {
    const result = await db.insert(volunteers).values({
      organizerName: body.organizationName,
      locationImageUrl: body.locationImageUrl,
      volunteerName: body.volunteerName,
      category: body.category,
      location: body.location,
      eventDate: body.eventDate,
      numPeople: body.numPeople,
      description: body.description,
    });

    console.log("result");
    console.log(result);
    await db.insert(userVolunteers).values({
      userId: body.userId,
      volunteerId: 1,
    });

    return c.json({ message: "ボランティアデータを正常に登録しました。" });
  } catch (e) {
    c.status(500);
    return c.json("ボランティアデータを正常に登録出来ませんでした。");
  }
});

// ボランティアリスト検索API
app.get("/volunteer-list", async (c) => {
  const db = drizzle(c.env.DB);

  try {
    const results = await db.select().from(volunteers);

    const response = results.map((result) => ({
      id: result.id,
      volunteerName: result.volunteerName,
      description: result.description,
      organizationName: result.organizerName,
      eventDate: result.eventDate,
      location: result.location,
    }));

    return c.json(response);
  } catch (e) {
    c.status(500);
    return c.json("ボランティアデータを正常に取得出来ませんでした。");
  }
});

// ボランティア共有状態変更API
app.put("/volunteer/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = Number(c.req.param("id"));

  try {
    await db
      .update(volunteers)
      .set({ isSharedToStudents: true })
      .where(eq(volunteers.id, id));

    return c.json({
      message: "ボランティアデータの共有フラグを更新出来ました。",
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "ボランティアデータの共有フラグを更新出来ませんでした。",
    });
  }
});
export default app;
