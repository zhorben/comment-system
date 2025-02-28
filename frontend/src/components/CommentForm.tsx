import { useState, FormEvent } from "react";
import { Box, Button, Input, Textarea, VStack, HStack } from "@chakra-ui/react";
import { useAddComment, useAddReply } from "../hooks/useComments";

interface CommentFormProps {
  parentId?: string;
  isReply?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CommentForm = ({
  parentId,
  isReply = false,
  onSuccess,
  onCancel,
}: CommentFormProps) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const addComment = useAddComment();
  const addReply = useAddReply();

  const isLoading = isReply ? addReply.isPending : addComment.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;

    try {
      if (isReply && parentId) {
        await addReply.mutateAsync({
          parentId,
          text,
          author,
        });
      } else {
        await addComment.mutateAsync({
          text,
          author,
        });
      }

      setText("");

      if (!isReply) {
        setAuthor("");
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={4}
      borderRadius="md"
      shadow="sm"
    >
      <VStack gap={3} align="stretch">
        <Box>
          <Box as="label" fontWeight="medium" mb={1} display="block">
            {isReply ? "Your reply" : "Comment"} *
          </Box>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isReply ? "Write a reply..." : "Write a comment..."}
            size="sm"
            required
          />
        </Box>

        <Box>
          <Box as="label" fontWeight="medium" mb={1} display="block">
            Name *
          </Box>
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            size="sm"
            required
          />
        </Box>

        <HStack justifyContent="flex-end" gap={2}>
          {isReply && onCancel && (
            <Button size="sm" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" loading={isLoading} size="sm">
            {isReply ? "Reply" : "Post Comment"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CommentForm;
