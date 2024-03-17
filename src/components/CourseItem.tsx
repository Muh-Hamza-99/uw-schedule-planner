import { Badge, Card, CardBody, Checkbox, Spacer, Stack } from '@chakra-ui/react';
import daysFormatter from '../lib/daysFormatter';
import timeFormatter from '../lib/timeFormatter';
import { useContext } from 'react';
import { SelectedCoursesContext } from '../context/useSelectedCourses';

type Props = {
    course: Course
    subjectCode: string
    catalogNumber: string
}

const CourseItem = ({ course, subjectCode, catalogNumber }: Props) => {
    const {selectedCourses, setSelectedCourses} = useContext(SelectedCoursesContext);
    const { classMeetingEndTime, classMeetingStartTime, classMeetingWeekPatternCode }: Schedule = course.scheduleData[0];
    const { enrolledStudents, maxEnrollmentCapacity } = course;
    const startDate = new Date(classMeetingStartTime);
    const endDate = new Date(classMeetingEndTime);
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    const handleCourses = (event: React.ChangeEvent<HTMLInputElement>, course: Course) => {
        if (event.target.checked) {
          setSelectedCourses([...selectedCourses, { ...course,  subjectCode: subjectCode.toUpperCase().trim(), catalogNumber: catalogNumber.toUpperCase().trim() }]);
        } else {
          setSelectedCourses(selectedCourses.filter(selectedCourse => selectedCourse.classNumber !== course.classNumber))
        }
      }

    if (course.courseComponent === "LEC" || course.courseComponent === "LAB") {
      return (
          <Card>
            <CardBody>
              <Stack direction="row">
                {startHours ? (<Badge colorScheme="green">{timeFormatter(startHours, startMinutes)}</Badge>) : null}
                {endHours ? (<Badge colorScheme="red">{timeFormatter(endHours, endMinutes)}</Badge>) : null}
                <Badge colorScheme="purple">{daysFormatter(classMeetingWeekPatternCode) ? daysFormatter(classMeetingWeekPatternCode) : "Online"}</Badge>
                {enrolledStudents !== maxEnrollmentCapacity ? (<Badge>{`${enrolledStudents}/${maxEnrollmentCapacity}`}</Badge>) : (<Badge colorScheme="red">FULL</Badge>)}
                <Spacer />
                <Checkbox defaultChecked={selectedCourses.map(course => course.classNumber).includes(course.classNumber)} onChange={event => handleCourses(event, course)}></Checkbox>
              </Stack>
            </CardBody>
          </Card>
      )
    } else {
      return null;
    }
}

export default CourseItem;