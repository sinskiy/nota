"use client";

import DailyNote from "@/components/DailyNote";
import PreviousDays from "@/components/PreviousDays";
import { FormEventHandler, useEffect, useState } from "react";

export interface Notes {
  [key: string]: string;
}

export type HandleTodayTextSubmit = FormEventHandler;

export default function Home() {
  const [todayText, setTodayText] = useState("");

  const [notes, setNotes] = useState<Notes>({});
  useEffect(() => {
    const savedNotes = localStorage.notes;
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(parsedNotes);

    const todayKey = getTodayKey();
    if (todayKey in parsedNotes) {
      setTodayText(parsedNotes[todayKey]);
    }
  }, []);

  const handleTodayTextSubmit: HandleTodayTextSubmit = (e) => {
    e.preventDefault();

    if (todayText.length === 0) return;

    const todayKey = getTodayKey();

    const newNotes = { ...notes, [todayKey]: todayText };
    setNotes(newNotes);
    localStorage.notes = JSON.stringify(newNotes);
  };
  return (
    <main className="max-w-[75ch] m-auto px-4 py-8 grid gap-8">
      <DailyNote
        todayText={todayText}
        setTodayText={setTodayText}
        handleTodayTextSubmit={handleTodayTextSubmit}
      />
      <PreviousDays previousDays={notes} />
    </main>
  );
}

function getTodayKey(): string {
  return new Date().toDateString();
}
