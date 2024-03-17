import { Card } from '@chakra-ui/react'
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { useContext, useEffect, useRef } from 'react';
import { SelectedCoursesContext } from '../context/useSelectedCourses';
import selectedCoursesToEvents from '../lib/selectedCoursesToEvents';
import { COLUMNS } from '../lib/constants';


const Calendar = () => {
  const {selectedCourses} = useContext(SelectedCoursesContext);
  const calendarRef = useRef(null);
  useEffect(() => {
    console.log(selectedCoursesToEvents(selectedCourses));
    const events = selectedCoursesToEvents(selectedCourses);
    // @ts-ignore
    calendarRef.current && calendarRef.current.control.update({ events: events });
  }, [selectedCourses]);
  return (
    <Card m={10}>
        <DayPilotCalendar ref={calendarRef} dayBeginsHour={8} dayEndHour={6} viewType="Resources" columns={COLUMNS} />
    </Card>
  )
}

export default Calendar