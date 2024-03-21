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
  CardHeader,
  CardBody
} from "@chakra-ui/react";
import { SelectedCoursesContext } from "../context/useSelectedCourses";
import CourseItem from "./CourseItem";
import SelectedCourseItem from "./SelectedCourseItem";

const Sidebar = () => {
  const toast = useToast();
  const {selectedCourses} = useContext(SelectedCoursesContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");

  const getCourses = async () => {
    const url = `https://openapi.data.uwaterloo.ca/v3/ClassSchedules/1241/${subjectCode.toLowerCase().trim()}/${catalogNumber.toLowerCase().trim()}`;
    await axios.get(url, { headers: { "x-api-key": import.meta.env.VITE_UW_API_KEY } })
        .then(data => setCourses(data.data))
        .catch(error => {
          if (isAxiosError(error)) {
            toast({ title: "Not found!", description: `${subjectCode.toUpperCase().trim()} ${catalogNumber.toUpperCase().trim()}`, duration: 3000, isClosable: true, status: "error" });
            setSubjectCode("");
            setCatalogNumber("");
          }});
  }

  const onSubmit = () => {
    if (subjectCode === "" || catalogNumber === "") {
      toast({ title: "Invalid Input!", description: "Please fill in the fields", duration: 3000, isClosable: true, status: "error" });
      return;
    }
    try {
      setCourses([]);
      getCourses();
    } catch (error) {
      toast({ title: "Umm...", description: `Something went wrong!`, duration: 3000, isClosable: true, status: "error" });
      setSubjectCode("");
      setCatalogNumber("");
    }
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
              {selectedCourses?.map((course, index) => (<SelectedCourseItem key={index} course={course} subjectCode={subjectCode} catalogNumber={catalogNumber} />))}
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
          <CardFooter>
            <Button onClick={onSubmit} my={2} colorScheme="teal">Get Classes</Button>
          </CardFooter>
      </Card>
    </>
  );
};

export default Sidebar;