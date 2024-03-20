import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ContextProvider } from "./context/useSelectedCourses";

const App = () => {
  return (
    <ContextProvider>
      <Navbar />
      <Sidebar />
      <Calendar  />
    </ContextProvider>
  );
};

export default App;
