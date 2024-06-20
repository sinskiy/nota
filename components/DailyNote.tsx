import { HandleTodayTextSubmit } from "@/app/page";
import { useRef } from "react";
import Settings from "./Settings";

interface Props {
  todayText: string;
  setTodayText: SetState<Props["todayText"]>;
  handleTodayTextSubmit: HandleTodayTextSubmit;
}

const DAILY_NOTE_PLACEHOLDER =
  "Today I accomplished a lot. I did this and this";

export default function DailyNote({
  todayText,
  setTodayText,
  handleTodayTextSubmit,
}: Props) {
  const textareaID = "daily";

  const settingsRef = useRef<HTMLDialogElement>(null);
  return (
    <section>
      <header className="grid grid-cols-1 grid-flow-col items-center">
        <h2>Daily note</h2>
        <button
          onClick={() => settingsRef.current?.showModal()}
          className="icon-button"
        >
          ⚙
        </button>
        <dialog ref={settingsRef}>
          <Settings />
        </dialog>
      </header>
      <form
        action=""
        method="get"
        className="grid gap-2"
        onSubmit={handleTodayTextSubmit}
      >
        <textarea
          value={todayText}
          onChange={(e) => setTodayText(e.currentTarget.value)}
          className="card"
          required
          minLength={1}
          rows={6}
          placeholder={DAILY_NOTE_PLACEHOLDER}
          name={textareaID}
          id={textareaID}
        ></textarea>
        <button type="submit" className="justify-self-end text-button">
          Save
        </button>
      </form>
    </section>
  );
}
