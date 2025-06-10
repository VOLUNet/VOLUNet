import { Hono } from "hono";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users, userVolunteers, volunteers } from "./db/schema";
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
  category: "EnvironmentProtection" | "Welfare" | "CommunityActivity";
  locationImageUrl: string;
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
      locationImageUrl: body.locationImageUrl,
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

// ボランティア単体取得(教員用)
app.get("/volunteer/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = Number(c.req.param("id"));

  // TODO:promise.allでまとめるべき
  try {
    const volunteerSearchResult = await db
      .select()
      .from(volunteers)
      .where(eq(volunteers.id, id));

    const userVolunteerSearchResult = await db
      .select()
      .from(userVolunteers)
      .where(eq(userVolunteers.volunteerId, id));

    const userSearchResult = await db
      .select()
      .from(users)
      .where(eq(users.id, userVolunteerSearchResult[0].userId));

    const response = {
      category: volunteerSearchResult[0].category,
      locationImageUrl: volunteerSearchResult[0].locationImageUrl,
      volunteerName: volunteerSearchResult[0].volunteerName,
      eventDate: volunteerSearchResult[0].eventDate,
      location: volunteerSearchResult[0].location,
      numPeople: volunteerSearchResult[0].numPeople,
      organizationName: volunteerSearchResult[0].organizerName,
      organizer: userSearchResult[0].name,
    };

    return c.json(response);
  } catch (e) {
    c.status(500);
    return c.json("ボランティアデータを正常に取得出来ませんでした。");
  }
});
export default app;
