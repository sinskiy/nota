import { HandleTodayTextSubmit } from "@/app/page";
import { useRef, useState } from "react";
import Settings from "./Settings";
import ChooseTemplate from "./ChooseTemplate";

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
  const [templates, setTemplates] = useState<string[]>([]);

  const textareaID = "daily";

  const settingsRef = useRef<HTMLDialogElement>(null);
  const chooseTemplateRef = useRef<HTMLDialogElement>(null);
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
          <Settings templates={templates} setTemplates={setTemplates} />
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
        <div className="justify-self-end flex gap-2">
          <button
            onClick={() => chooseTemplateRef.current?.showModal()}
            type="button"
            className="outlined-button"
          >
            Override with template
          </button>
          <dialog ref={chooseTemplateRef}>
            <ChooseTemplate
              dialogRef={chooseTemplateRef}
              templates={templates}
              setTodayText={setTodayText}
            />
          </dialog>
          <button type="submit" className="text-button">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
