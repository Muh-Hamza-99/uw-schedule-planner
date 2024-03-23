import { Badge, Card, CardBody, Checkbox, Spacer, Stack } from '@chakra-ui/react';
import daysFormatter from '../lib/daysFormatter';
import timeFormatter from '../lib/timeFormatter';
import { useContext } from 'react';
import { SelectedCoursesContext } from '../context/useSelectedCourses';

type Props = {
    course: SelectedCourse
}

const CourseItem = ({ course }: Props) => {
    const {selectedCourses, setSelectedCourses} = useContext(SelectedCoursesContext);
    const { classMeetingEndTime, classMeetingStartTime, classMeetingWeekPatternCode }: Schedule = course.scheduleData[0];
    const { enrolledStudents, maxEnrollmentCapacity } = course;
    const startDate = new Date(classMeetingStartTime);
    const endDate = new Date(classMeetingEndTime);
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    const handleCourses = (course: SelectedCourse) => {
          setSelectedCourses(selectedCourses.filter(selectedCourse => selectedCourse.classNumber !== course.classNumber));
      }

    if (course.courseComponent === "LEC" || course.courseComponent === "LAB") {
      return (
          <Card>
            <CardBody>
              <Stack direction="row">
                <Badge colorScheme="teal">{`${course.subjectCode} ${course.catalogNumber}`}</Badge>
                {startHours ? (<Badge colorScheme="green">{timeFormatter(startHours, startMinutes)}</Badge>) : null}
                {endHours ? (<Badge colorScheme="red">{timeFormatter(endHours, endMinutes)}</Badge>) : null}
                <Badge colorScheme="purple">{daysFormatter(classMeetingWeekPatternCode) ? daysFormatter(classMeetingWeekPatternCode) : "Online"}</Badge>
                {enrolledStudents !== maxEnrollmentCapacity ? (<Badge>{`${enrolledStudents}/${maxEnrollmentCapacity}`}</Badge>) : (<Badge colorScheme="red">FULL</Badge>)}
                <Spacer />
                <Checkbox defaultChecked onChange={() => handleCourses(course)}></Checkbox>
              </Stack>
            </CardBody>
          </Card>
      )
    } else {
      return null;
    }
}

export default CourseItem;