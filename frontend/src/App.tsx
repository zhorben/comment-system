import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import CommentSection from "./components/CommentSection";

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" letterSpacing="tight">
            Comment System
          </Heading>
        </Box>

        <Box>
          <CommentSection />
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
