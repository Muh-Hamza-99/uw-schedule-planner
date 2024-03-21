import { Box, Flex } from "@chakra-ui/react";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ContextProvider } from "./context/useSelectedCourses";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ContextProvider>
      <Flex m={4} gap={4} justifyContent={"space-between"}>
        <Flex width={"40%"} height={"100%"} flexDirection={"column"}>
          <Navbar />
          <Sidebar />
        </Flex>
        <Box width={"60%"}>
          <Calendar  />
        </Box>
      </Flex>
      <Footer />
    </ContextProvider>
  );
};

export default App;
