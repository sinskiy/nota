import { ChangeEvent, UIEvent, useState } from "react";

interface Props {}

export default function Calendar({}: Props) {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(endYear);

  const days = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div className="card">
      <div className="flex gap-8">
        {/* value and key are indexes, child is string */}
        <select
          name="months"
          id="months"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(getNumericValue(e))}
        >
          {MONTHS.map((month, i) => (
            <option key={i} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="years"
          id="years"
          value={selectedYear}
          onChange={(e) => setSelectedYear(getNumericValue(e))}
        >
          {/* everything is year, not indexes */}
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div
        className="uppercase mt-8 text-center"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day.charAt(0)}</span>
        ))}
        {days.map((day) => (
          <span
            key={day.index}
            // fortunately we don't need to use weekIndex, because cells are pushed anyway
            style={{ gridColumn: `${day.weekDay + 1} / span 1` }}
          >
            {day.index}
          </span>
        ))}
      </div>
    </div>
  );
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

const START_YEAR: number = new Date(0).getFullYear();
const endYear: number = new Date().getFullYear();
const years: number[] = [];

for (let i = START_YEAR; i <= endYear; i++) {
  years.push(i);
}

const WEEK_DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

interface MonthDay {
  index: number;
  weekDay: number;
}

function getDaysInMonth(monthIndex: number, year: number) {
  const date: Date = new Date(year, monthIndex, 1);
  const days: MonthDay[] = [];
  while (date.getMonth() === monthIndex) {
    const nextDay: MonthDay = {
      index: date.getDate(),
      weekDay: date.getDay(),
    } as const;
    days.push(nextDay);

    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getNumericValue(e: ChangeEvent<HTMLSelectElement>): number {
  const asNumber = Number(e.currentTarget.value);
  return asNumber;
}
