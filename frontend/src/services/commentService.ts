import { Comment } from "../models/comment";

const API_URL = "http://localhost:3001";

export async function fetchComments(): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/comments`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
}

export async function addComment(
  text: string,
  author: string,
): Promise<Comment> {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, author }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json();
}

export async function addReply(
  parentId: string,
  text: string,
  author: string,
): Promise<Comment> {
  const response = await fetch(`${API_URL}/comments/${parentId}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, author }),
  });

  if (!response.ok) {
    throw new Error("Failed to add reply");
  }

  return response.json();
}

export async function upvoteComment(id: string): Promise<Comment> {
  const response = await fetch(`${API_URL}/comments/${id}/upvote`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to upvote comment");
  }

  return response.json();
}
