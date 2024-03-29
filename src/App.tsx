import { Box, Flex } from "@chakra-ui/react";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SelectedCoursesContextProvider } from "./context/useSelectedCourses";
import { TermContextProvider } from "./context/useTerm";
import Footer from "./components/Footer";

const App = () => {
  return (
    <TermContextProvider>
      <SelectedCoursesContextProvider>
        <Flex p={4} flexDirection={"column"}>
          <Flex gap={4} flexDirection={{ base: "column", lg: "row" }}>
            <Flex width={{ base: "100%", lg:"40%" }} height={"100%"} flexDirection={"column"} mb={{ base: "8", lg: "0" }}>
              <Navbar />
              <Sidebar />
            </Flex>
            <Box width={{ base: "100%", lg: "60%" }}>
              <Calendar  />
            </Box>
          </Flex>
          <Footer />
        </Flex>
      </SelectedCoursesContextProvider>
    </TermContextProvider>
  );
};

export default App;
