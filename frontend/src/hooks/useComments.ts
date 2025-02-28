import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchComments,
  addComment,
  addReply,
  upvoteComment,
} from "../services/commentService";
import { Comment } from "../models/comment";

const COMMENTS_QUERY_KEY = ["comments"];

export function useComments() {
  return useQuery<Comment[], Error>({
    queryKey: COMMENTS_QUERY_KEY,
    queryFn: fetchComments,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ text, author }: { text: string; author: string }) =>
      addComment(text, author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });
    },
  });
}

export function useAddReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parentId,
      text,
      author,
    }: {
      parentId: string;
      text: string;
      author: string;
    }) => addReply(parentId, text, author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });
    },
  });
}

export function useUpvoteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => upvoteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });
    },
  });
}
