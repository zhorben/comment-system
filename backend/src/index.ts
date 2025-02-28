import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import {
  getAllComments,
  addComment,
  getCommentById,
  upvoteComment,
} from "./models/comment";

const app = new Hono();

// Apply CORS middleware
app.use("/*", cors());

// GET /comments - get all comments
app.get("/comments", (c) => {
  const comments = getAllComments();
  return c.json(comments);
});

// POST /comments - add a new top-level comment
app.post("/comments", async (c) => {
  const body = await c.req.json();

  if (!body || !body.text || !body.author) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const newComment = addComment(body.text, body.author);
  return c.json(newComment, 201);
});

// POST /comments/:id/reply - reply to a comment
app.post("/comments/:id/reply", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  if (!body || !body.text || !body.author) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const parentComment = getCommentById(id);
  if (!parentComment) {
    return c.json({ error: "Parent comment not found" }, 404);
  }

  const newReply = addComment(body.text, body.author, id);
  return c.json(newReply, 201);
});

// POST /comments/:id/upvote - upvote a comment
app.post("/comments/:id/upvote", (c) => {
  const id = c.req.param("id");
  const updatedComment = upvoteComment(id);

  if (!updatedComment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  return c.json(updatedComment);
});

// Start the server
const port = Number(process.env.PORT) || 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
