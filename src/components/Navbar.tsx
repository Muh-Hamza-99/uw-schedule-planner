import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box borderRadius={2} bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading fontSize="xl">UW Schedule Planner</Heading>
          </Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;