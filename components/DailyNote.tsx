import { HandleTodayTextSubmit } from "@/app/page";

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
  return (
    <section>
      <h2>Daily note</h2>
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
        <button type="submit" className="justify-self-end">
          Save
        </button>
      </form>
    </section>
  );
}
