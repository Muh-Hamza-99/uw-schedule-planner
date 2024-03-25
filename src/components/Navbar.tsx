import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import { TermContext } from "../context/useTerm";

const Navbar = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const {setTerm} = useContext(TermContext);
  const toast = useToast();
  const getTerms = async () => {
    const url = `https://openapi.data.uwaterloo.ca/v3/Terms/foracademicyear/${Number((new Date).getFullYear()) + 1}`;
    await axios.get(url, { headers: { "x-api-key": import.meta.env.VITE_UW_API_KEY } })
        .then(data => setTerms(data.data))
        .catch(() => toast({ title: "Not found!", description: "UW API isn't working!", duration: 3000, isClosable: true, status: "error" }));
  }

  useEffect(() => {
    getTerms();
  }, []);
  return (
    <>
      <Box borderRadius={2} bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading fontSize="xl">UW Schedule Planner</Heading>
          </Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Select onChange={event => setTerm(terms.filter(term => term.termCode == event.target.value)[0])} placeholder="Select a term...">
                {terms.map((term, index) => <option key={index} value={term.termCode}>{term.name}</option>)}
              </Select>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;