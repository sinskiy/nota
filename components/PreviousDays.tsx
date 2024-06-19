import { Notes, getDateKey } from "@/app/page";
import Calendar from "./ui/Calendar";
import Markdown from "react-markdown";
import { useRef, useState } from "react";

interface Props {
  previousDays: Notes;
}

export default function PreviousDays({ previousDays }: Props) {
  const dates = Object.keys(previousDays);

  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const selectedNote = selectedDate
    ? previousDays[getDateKey(selectedDate)]
    : null;

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      {dates.length ? (
        <section>
          <h2>Previous days</h2>
          <button
            onClick={() =>
              dialogRef.current &&
              (dialogRef.current.open
                ? dialogRef.current.close()
                : dialogRef.current.show())
            }
          >
            {selectedDate?.toLocaleDateString() ?? "select date"}
          </button>
          <dialog ref={dialogRef} id="calendar">
            <Calendar
              initialDate={initialDate}
              setDate={setSelectedDate}
              enabled={dates}
            />
          </dialog>
          {selectedDate && (
            <section className="mt-6">
              <h3>Note on {selectedDate.toLocaleDateString()}</h3>
              <Markdown className="card p-8 prose prose-invert">
                {selectedNote}
              </Markdown>
            </section>
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
}
