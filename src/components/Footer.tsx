import { Flex, Link, Text, VStack } from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <VStack direction={"column"} mt={4}>
        <Text>Muhammad Hamza</Text>
        <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
            <Link isExternal href="https://www.linkedin.com/in/hamzaasad/">
                <FaLinkedin color={"#0077B5"} size={30} />
            </Link>
            <Link isExternal href="https://github.com/Muh-Hamza-99">
                <FaGithub color={"#24292E"} size={30} />
            </Link>
        </Flex>
    </VStack>
  )
}

export default Footer;