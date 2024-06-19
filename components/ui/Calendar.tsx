import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  initialDate: Date;
  setDate: SetState<Date | null>;
}

export default function Calendar({ initialDate, setDate }: Props) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState<null | number>(
    initialDate.getDate()
  );
  // I use selectedMonth as an example for typescript
  function handleMonthOrYearChange(
    e: ChangeEvent<HTMLSelectElement>,
    setMonthOrYear: SetState<typeof selectedMonth>
  ) {
    const formattedMonthOrYear = Number(e.target.value);
    setMonthOrYear(formattedMonthOrYear);

    setSelectedDay(null);
  }

  useEffect(() => {
    const newDate = selectedDay
      ? new Date(selectedYear, selectedMonth, selectedDay)
      : null;
    setDate(newDate);
  }, [selectedMonth, selectedYear, selectedDay, setDate]);

  const days = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div className="card p-8 w-fit">
      <div className="flex gap-8">
        {/* TODO: use user's months and days  */}
        {MONTHS.length > 1 && (
          <>
            {/* value and key are indexes, child is string */}
            <select
              name="months"
              id="months"
              value={selectedMonth}
              onChange={(e) => handleMonthOrYearChange(e, setSelectedMonth)}
            >
              {MONTHS.map((month, i) => (
                <option key={i} value={i}>
                  {month}
                </option>
              ))}
            </select>
          </>
        )}
        {years.length > 1 && (
          <select
            name="years"
            id="years"
            value={selectedYear}
            onChange={(e) => handleMonthOrYearChange(e, setSelectedYear)}
          >
            {/* everything is year, not indexes */}
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
      <div
        className="uppercase mt-6 text-center grid gap-4"
        style={{
          gridTemplateColumns: "repeat(7, min-content)",
          gridAutoRows: "2.5rem",
        }}
      >
        {WEEK_DAYS.map((day) => (
          <span className="text-text-variant self-center" key={day}>
            {day.charAt(0)}
          </span>
        ))}
        {days.map((day) => {
          const dayId = String(day.index);
          const current =
            selectedMonth === currentMonth && day.index === currentDay;
          return (
            <div
              className={`relative rounded-full has-[:checked]:bg-primary has-[:checked]:text-text-primary has-[:checked]:border border-primary size-10 flex items-center justify-center ${
                current && "text-primary border-outline"
              }`}
              key={day.index}
              // fortunately we don't need to use weekIndex, because cells are pushed anyway
              style={{ gridColumn: `${day.weekDay + 1} / span 1` }}
            >
              <label htmlFor={dayId}>{day.index}</label>
              <input
                checked={selectedDay === day.index}
                onChange={(e) => setSelectedDay(Number(e.target.id))}
                className="absolute inset-0 opacity-0 peer"
                type="radio"
                name="days"
                id={dayId}
              />
            </div>
          );
        })}
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

const START_YEAR: number = 2024;
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
