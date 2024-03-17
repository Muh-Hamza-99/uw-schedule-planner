import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ContextProvider } from "./context/useSelectedCourses";

type Props = {};

const App = (props: Props) => {
  
  return (
    <ContextProvider>
      <Navbar />
      <Sidebar />
      <Calendar  />
    </ContextProvider>
  );
};

export default App;
