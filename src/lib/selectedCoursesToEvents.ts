import { DAYS, RESOURCE_IDS } from "./constants";
import daysFormatter from "./daysFormatter";
import timeFormatter from "./timeFormatter";

const selectedCoursesToEvents = (courses: SelectedCourse[]) => {
    const events = [];
    for (let i = 0; i < courses.length; i++) {
        const currentCourse = courses[i];
        const days = daysFormatter(currentCourse.scheduleData[0].classMeetingWeekPatternCode).split("-");
        for (let day of days) {
            const { subjectCode, catalogNumber } = currentCourse;
            const { classMeetingStartTime, classMeetingEndTime } = currentCourse.scheduleData[0];
            const [startHours, startMinutes] = (classMeetingStartTime.split("T")[1]).split(":");
            const [endHours, endMinutes] = (classMeetingEndTime.split("T")[1]).split(":");
            const event = {
                id: i,
                text: `${subjectCode} ${catalogNumber} | ${timeFormatter(Number(startHours), Number(startMinutes))} - ${timeFormatter(Number(endHours), Number(endMinutes))}`,
                start: classMeetingStartTime,
                end: classMeetingEndTime,
                resource: RESOURCE_IDS[DAYS.indexOf(day.toUpperCase())],
            }
            events.push(event);
        }     
    }
    return events;
}

export default selectedCoursesToEvents;