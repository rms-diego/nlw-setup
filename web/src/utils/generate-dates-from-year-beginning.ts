import dayJs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfYear = dayJs().startOf("year");
  const now = new Date();

  const dates = [];
  let compareDate = firstDayOfYear;

  while (compareDate.isBefore(now)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
