import { Notes, getDateKey } from "@/app/page";
import Calendar from "./ui/Calendar";
import { useState } from "react";

interface Props {
  previousDays: Notes;
}

export default function PreviousDays({ previousDays }: Props) {
  const asArray = Object.entries(previousDays);

  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const selectedNote = selectedDate
    ? previousDays[getDateKey(selectedDate)]
    : null;
  return (
    <>
      {asArray.length ? (
        <section>
          <h2>Previous days</h2>
          <Calendar initialDate={initialDate} setDate={setSelectedDate} />
          {selectedDate && (
            <section>
              <h3>Note on {selectedDate.toLocaleDateString()}</h3>
              <p>{selectedNote}</p>
            </section>
          )}
          {/* <ul>
            {asArray.map(([date, text]) => (
              <li key={date}>
                <h3>{new Date(date).toLocaleDateString()}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul> */}
        </section>
      ) : (
        ""
      )}
    </>
  );
}
