import { useContext, useRef, useState } from "react";
import axios, { isAxiosError } from "axios";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  Button,
  Stack,
  Input,
  useToast,
  Divider
} from "@chakra-ui/react";
import { SelectedCoursesContext } from "../context/useSelectedCourses";
import CourseItem from "./CourseItem";
import SelectedCourseItem from "./SelectedCourseItem";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();
  const {selectedCourses, setSelectedCourses} = useContext(SelectedCoursesContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setCourses([]);
      getCourses();
    } catch (error) {
      toast({ title: "Umm...", description: `Something went wrong!`, duration: 3000, isClosable: true, status: "error" });
      setSubjectCode("");
      setCatalogNumber("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Add Classes
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Classes</DrawerHeader>
          <DrawerBody>
            <Stack mb={4} spacing={3} direction="row">
              <Input onChange={event => setSubjectCode(event.target.value)} value={subjectCode} placeholder="MATH, CS, ECON..." />
              <Input onChange={event => setCatalogNumber(event.target.value)} value={catalogNumber} placeholder="138, 136, 101..." />
            </Stack>
            <Stack mb={12}>
              {selectedCourses?.map((course, index) => (<SelectedCourseItem key={index} course={course} subjectCode={subjectCode} catalogNumber={catalogNumber} />))}
            </Stack>
            <Divider />
            <Stack mt={12}>
            {courses?.map((course, index) => {
                const isSelectedCourse = selectedCourses.map(course => course.classNumber).includes(course.classNumber);
                if (isSelectedCourse) {
                  return null;
                } else {
                  return (<CourseItem key={index} course={course} subjectCode={subjectCode} catalogNumber={catalogNumber} />)
                }
              })}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={onSubmit} my={2} colorScheme="teal">Get Classes</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;