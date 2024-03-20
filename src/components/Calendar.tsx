import { Card } from '@chakra-ui/react'
import { DayPilotCalendar } from "daypilot-pro-react";
import { useContext, useEffect, useRef } from 'react';
import { SelectedCoursesContext } from '../context/useSelectedCourses';
import selectedCoursesToEvents from '../lib/selectedCoursesToEvents';
import { COLUMNS } from '../lib/constants';


const Calendar = () => {
  const {selectedCourses} = useContext(SelectedCoursesContext);
  const calendarRef = useRef();
  useEffect(() => {
    console.log(selectedCoursesToEvents(selectedCourses));
    const events = selectedCoursesToEvents(selectedCourses);
    // @ts-ignore
    calendarRef.current && calendarRef.current.control.update({ events: events });
  }, [selectedCourses]);
  return (
    <Card mx={10}>
        <DayPilotCalendar 
          ref={calendarRef} 
          dayBeginsHour={8}
          dayEndsHour={18}
          viewType="Resources"
          columns={COLUMNS}
          timeRangeSelectedHandling={"Disabled"}
          eventMoveHandling={"Disabled"}
          eventResizeHandling={"Disabled"}
          eventDeleteHandling={"Disabled"}
          eventClickHandling={"Disabled"}
          eventRightClickHandling={"Disabled"}
        />
    </Card>
  )
}

export default Calendar