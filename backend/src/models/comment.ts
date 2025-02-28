import { generateId } from "../helpers";

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  parentId: string | null;
  votes: number;
}

// in-memory database
const comments: Comment[] = [];

export function getAllComments(): Comment[] {
  return [...comments];
}

export function getCommentById(id: string): Comment | undefined {
  return comments.find((comment) => comment.id === id);
}

export function addComment(
  text: string,
  author: string,
  parentId: string | null = null,
): Comment {
  const newComment: Comment = {
    id: generateId(),
    text,
    author,
    timestamp: Date.now(),
    parentId,
    votes: 0,
  };
  comments.push(newComment);
  return newComment;
}

export function upvoteComment(id: string): Comment | undefined {
  const comment = getCommentById(id);
  if (comment) {
    comment.votes++;
  }
  return comment;
}
