import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({
    message: "service up",
  });
});

export default app;
