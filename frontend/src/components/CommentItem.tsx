import { useState } from "react";
import { Box, Flex, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { Comment } from "../models/comment";
import CommentForm from "./CommentForm";
import { formatDate } from "../utils";
import { useUpvoteComment } from "../hooks/useComments";

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
}

const CommentItem = ({ comment, replies }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const upvoteMutation = useUpvoteComment();

  const handleReplySuccess = () => {
    setIsReplying(false);
  };

  const handleToggleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleUpvote = () => {
    upvoteMutation.mutate(comment.id);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Box mb={4}>
      <Box
        p={4}
        bg={"white"}
        borderRadius="md"
        boxShadow="sm"
        borderLeft="4px solid"
        borderColor={"gray.200"}
      >
        <Flex gap={3}>
          <Box
            bg="blue.500"
            color="white"
            borderRadius="full"
            width="32px"
            height="32px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontWeight="bold"
          >
            {getInitials(comment.author)}
          </Box>
          <Box flex="1">
            <Flex justify="space-between" align="center" mb={1}>
              <Text fontWeight="bold">{comment.author}</Text>
              <Text fontSize="sm" color="gray.500">
                {formatDate(comment.timestamp)}
              </Text>
            </Flex>
            <Text mb={3}>{comment.text}</Text>
            <HStack gap={4}>
              <Button size="xs" variant="outline" onClick={handleToggleReply}>
                {isReplying ? "Cancel" : "Reply"}
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={handleUpvote}
                loading={
                  upvoteMutation.isPending &&
                  upvoteMutation.variables === comment.id
                }
              >
                👍 {comment.votes}
              </Button>
            </HStack>
          </Box>
        </Flex>
      </Box>

      {isReplying && (
        <Box ml={{ base: 4, md: 8 }} mt={2}>
          <CommentForm
            parentId={comment.id}
            isReply={true}
            onSuccess={handleReplySuccess}
            onCancel={handleToggleReply}
          />
        </Box>
      )}

      {replies.length > 0 && (
        <VStack gap={2} mt={2} ml={{ base: 4, md: 8 }} align="stretch">
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} replies={[]} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CommentItem;
