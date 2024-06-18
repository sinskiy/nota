"use client";

import { FormEvent, Fragment, useEffect, useState } from "react";

interface Note {
  [key: string]: string;
}

export default function Home() {
  const [todayText, setTodayText] = useState("");

  const [notes, setNotes] = useState<Note>({});
  useEffect(() => {
    const savedNotes = localStorage.notes;
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(parsedNotes);

    const todayKey = getTodayKey();
    if (todayKey in parsedNotes) {
      setTodayText(parsedNotes[todayKey]);
    }
  }, []);

  function handleTodayTextSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (todayText.length === 0) return;

    const todayKey = getTodayKey();

    const newNotes = { ...notes, [todayKey]: todayText };
    setNotes(newNotes);
    localStorage.notes = JSON.stringify(newNotes);
  }
  return (
    <main className="max-w-[75ch] m-auto px-4 py-8 grid gap-8">
      {
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
              placeholder="Today I accomplished a lot. I did this and this"
              name="daily"
              id="daily"
            ></textarea>
            <button type="submit" className="justify-self-end">
              Save
            </button>
          </form>
        </section>
      }
      {Object.keys(notes).length ? (
        <section>
          <h2>Previous days</h2>
          {/* <input type="date" name="date" id="date" />
        <h3>Note</h3>
        <p>
          Contradictions do not exist. Whenever you think that you are facing a
          contradiction, check your premises. You will find that one of them is
          wrong.
        </p> */}
          {Object.entries(notes).map(([date, text]) => (
            <Fragment key={date}>
              <h3>{new Date(date).toLocaleDateString()}</h3>
              <p>{text}</p>
            </Fragment>
          ))}
        </section>
      ) : (
        ""
      )}
    </main>
  );
}

function getTodayKey(): string {
  return new Date().toDateString();
}
