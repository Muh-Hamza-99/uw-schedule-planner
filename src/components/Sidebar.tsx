import { useContext, useState } from "react";
import axios, { isAxiosError } from "axios";
import {
  Button,
  Stack,
  Input,
  useToast,
  Divider,
  Card,
  CardFooter,
  CardBody,
  Spacer,
} from "@chakra-ui/react";
import { SelectedCoursesContext } from "../context/useSelectedCourses";
import CourseItem from "./CourseItem";
import SelectedCourseItem from "./SelectedCourseItem";
import { TermContext } from "../context/useTerm";

const Sidebar = () => {
  const toast = useToast();
  const {selectedCourses, setSelectedCourses} = useContext(SelectedCoursesContext);
  const {term} = useContext(TermContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");

  const getCourses = async () => {
    const url = `https://openapi.data.uwaterloo.ca/v3/ClassSchedules/${term?.termCode}/${subjectCode.toLowerCase().trim()}/${catalogNumber.toLowerCase().trim()}`;
    await axios.get(url, { headers: { "x-api-key": import.meta.env.VITE_UW_API_KEY } })
        .then(data => setCourses(data.data))
        .catch(error => {
          if (isAxiosError(error)) {
            toast({ position: "top", title: "Not found!", description: `${subjectCode.toUpperCase().trim()} ${catalogNumber.toUpperCase().trim()}`, duration: 3000, isClosable: true, status: "error" });
            setSubjectCode("");
            setCatalogNumber("");
          }});
  }

  const onSubmit = () => {
    if (subjectCode === "" || catalogNumber === "") {
      toast({ position: "top", title: "Invalid Input!", description: "Please fill in the fields", duration: 3000, isClosable: true, status: "error" });
      return;
    } else if (!term) {
      toast({ position: "top", title: "No Term!", description: "Please pick a term!", duration: 3000, isClosable: true, status: "error" });
      return;
    }
    try {
      setCourses([]);
      getCourses();
    } catch (error) {
      toast({ position: "top", title: "Umm...", description: `Something went wrong!`, duration: 3000, isClosable: true, status: "error" });
      setSubjectCode("");
      setCatalogNumber("");
    }
  }

  const clearCalendar = () => {
    setSelectedCourses([]);
    setCourses([]);
    localStorage.removeItem("selectedCourses");
    setCatalogNumber("");
    setSubjectCode("");
  }

  return (
    <>
      <Card mt={2} height={"80vh"}>
          <CardBody overflow={"scroll"}>
            <Stack mb={4} spacing={3} direction="row">
              <Input onChange={event => setSubjectCode(event.target.value)} value={subjectCode} placeholder="MATH, CS, ECON..." />
              <Input onChange={event => setCatalogNumber(event.target.value)} value={catalogNumber} placeholder="138, 136, 101..." />
            </Stack>
            <Stack mb={4}>
              {selectedCourses?.map((course, index) => (<SelectedCourseItem key={index} course={course} />))}
            </Stack>
            <Divider />
            <Stack mt={4}>
            {courses?.map((course, index) => {
                const isSelectedCourse = selectedCourses.map(course => course.classNumber).includes(course.classNumber);
                if (isSelectedCourse) {
                  return null;
                } else {
                  return (<CourseItem key={index} course={course} subjectCode={subjectCode} catalogNumber={catalogNumber} />)
                }
              })}
            </Stack>
          </CardBody>
          <CardFooter alignItems={"center"}>
              <Button onClick={onSubmit} my={2} colorScheme="teal">Get Classes</Button>
              <Spacer />
              <Button onClick={() => clearCalendar()} colorScheme="red">Clear Calendar</Button>
          </CardFooter>
      </Card>
    </>
  );
};

export default Sidebar;