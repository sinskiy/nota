"use client";

import DailyNote from "@/components/DailyNote";
import PreviousDays from "@/components/PreviousDays";
import Skeleton from "@/components/ui/Skeleton";
import { FormEventHandler, useEffect, useState } from "react";

export interface Notes {
  [key: string]: string;
}

export type HandleTodayTextSubmit = FormEventHandler;

export default function Home() {
  const [todayText, setTodayText] = useState("");

  const [notes, setNotes] = useState<Notes>({});

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const savedNotes = localStorage.notes;
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(parsedNotes);

    const todayKey = getDateKey();
    if (todayKey in parsedNotes) {
      setTodayText(parsedNotes[todayKey]);
    }

    setMounted(true);
  }, []);

  const handleTodayTextSubmit: HandleTodayTextSubmit = (e) => {
    e.preventDefault();

    if (todayText.length === 0) return;

    const todayKey = getDateKey();

    const newNotes = { ...notes, [todayKey]: todayText };
    setNotes(newNotes);
    localStorage.notes = JSON.stringify(newNotes);
  };
  return (
    <main className="max-w-[75ch] m-auto px-4 py-8 grid gap-8">
      {mounted ? (
        <>
          <DailyNote
            todayText={todayText}
            setTodayText={setTodayText}
            handleTodayTextSubmit={handleTodayTextSubmit}
          />
          <PreviousDays previousDays={notes} />
        </>
      ) : (
        <div>
          <Skeleton className="h-8 mb-4" />
          <Skeleton />
          <Skeleton className="h-10 mt-4 ml-auto w-32 rounded-large" />
        </div>
      )}
    </main>
  );
}

export function getDateKey(date?: Date): string {
  return new Date(date ?? Date.now()).toDateString();
}
