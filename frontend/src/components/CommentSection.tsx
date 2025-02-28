import { Box, Heading, Text, Spinner, Center, VStack } from "@chakra-ui/react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import ErrorMessage from "./ErrorMessage";
import { useComments } from "../hooks/useComments";

const CommentSection = () => {
  const { data: comments = [], isLoading, error } = useComments();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  );

  const getReplies = (parentId: string) => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Discussion
      </Heading>

      {error && (
        <ErrorMessage
          message={"Failed to load comments. Please try again later."}
        />
      )}

      <Box mb={6}>
        <CommentForm />
      </Box>

      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : topLevelComments.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">
            No comments yet. Be the first to comment!
          </Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          {topLevelComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={getReplies(comment.id)}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CommentSection;
