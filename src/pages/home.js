import React from "react";
import userStore from "@/store/userStore";
import { Box, Heading, Center } from "@chakra-ui/react";

const Home = () => {
  const user = userStore((state) => state.user);

  return (
    <Center
      h="100vh"
    >
      {user ? (
        <Box fontSize="xl">Welcome {user.username}! You have logged in.</Box>
      ) : (
        <Box fontSize="xl">No user data available</Box>
      )}
    </Center>
  );
};

export default Home;
