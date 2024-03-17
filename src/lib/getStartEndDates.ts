import moment from "moment";

const getStartEndDates = () => {
  const start = moment().startOf("week").add(1, "day").toDate();
  const startDateString = `${start.getFullYear()}-${start.getMonth() < 10 ? `0${start.getMonth()}` : start.getMonth()}-${start.getDate() < 10 ? `0${start.getDate()}` : start.getDate()}`
  const end = moment().endOf("week").add(-1, "day").toDate();
  const endDateString = `${end.getFullYear()}-${end.getMonth() < 10 ? `0${end.getMonth()}` : end.getMonth()}-${end.getDate() < 10 ? `0${end.getDate()}` : end.getDate()}`
  return [startDateString, endDateString];
};

export default getStartEndDates;