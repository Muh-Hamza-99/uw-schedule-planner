import { Box, Flex } from "@chakra-ui/react";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SelectedCoursesContextProvider } from "./context/useSelectedCourses";
import { TermContextProvider } from "./context/useTerm";

const App = () => {
  return (
    <TermContextProvider>
    <SelectedCoursesContextProvider>
      <Flex m={4} gap={4} height="100vh" justifyContent={"space-between"}>
        <Flex width={"40%"} height={"100%"} flexDirection={"column"}>
          <Navbar />
          <Sidebar />
        </Flex>
        <Box width={"60%"}>
          <Calendar  />
        </Box>
      </Flex>
    </SelectedCoursesContextProvider>
    </TermContextProvider>
  );
};

export default App;
