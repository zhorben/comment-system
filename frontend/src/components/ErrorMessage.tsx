import { Box, Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <Box
      bg="red.100"
      color="red.800"
      p={3}
      borderRadius="md"
      mb={4}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Text fontSize="lg">⚠️</Text>
      <Text>{message}</Text>
    </Box>
  );
};

export default ErrorMessage;
