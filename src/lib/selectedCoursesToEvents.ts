import { DAYS, RESOURCE_IDS } from "./constants";
import daysFormatter from "./daysFormatter";

const selectedCoursesToEvents = (courses: SelectedCourse[]) => {
    const events = [];
    for (let i = 0; i < courses.length; i++) {
        const currentCourse = courses[i];
        const days = daysFormatter(currentCourse.scheduleData[0].classMeetingWeekPatternCode).split("-");
        for (let day of days) {
            const event = {
                id: i,
                text: `${currentCourse.subjectCode} ${currentCourse.catalogNumber}`,
                start: currentCourse.scheduleData[0].classMeetingStartTime,
                end: currentCourse.scheduleData[0].classMeetingEndTime,
                resource: RESOURCE_IDS[DAYS.indexOf(day.toUpperCase())],
            }
            events.push(event);
        }     
    }
    return events;
}

export default selectedCoursesToEvents;