import { Hono } from "hono";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users, volunteers } from "./db/schema";

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
  category: "EnvironmentProtection" | "Welfare" | "CommunityActivity";
  volunteerName: string;
  location: string;
  eventDate: Date;
  numPeople: number;
  description: string;
}

// ボランティア登録用API
app.post("/volunteer", async (c) => {
  const db = drizzle(c.env.DB);
  const body = c.req.json() as unknown as volunteerPost;

  try {
    const result = await db.insert(volunteers).values({
      organizerName: "TODO(小梶):organizerNameどうするつもりか聞く",
      volunteerName: body.volunteerName,
      category: body.category,
      location: body.location,
      eventDate: body.eventDate,
      numPeople: body.numPeople,
      description: body.description,
    });

    return c.json({ message: "ボランティアデータを正常に登録しました。" });
  } catch (e) {
    c.status(500);
    return c.json("ボランティアデータを正常に登録出来ませんでした。");
  }
});

export default app;
