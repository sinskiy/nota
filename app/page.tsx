"use client";

import DailyNote from "@/components/DailyNote";
import PreviousDays, { getDateKey } from "@/components/PreviousDays";
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
    const savedNotes = localStorage.getItem("notes");
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(parsedNotes);

    const todayKey = getDateKey();
    if (todayKey in parsedNotes) {
      setTodayText(parsedNotes[todayKey]);
    } else {
      const savedTemplates = localStorage.getItem("templates");
      if (!savedTemplates) return;
      const parsedTemplates = JSON.parse(savedTemplates);
      if (!parsedTemplates.length) return;

      const savedDefaultTemplate = localStorage.getItem("defaultTemplate");
      if (savedDefaultTemplate) {
        setTodayText(parsedTemplates[Number(savedDefaultTemplate)]);
      } else {
        setTodayText(parsedTemplates[0]);
      }
    }

    setMounted(true);
  }, []);

  const handleTodayTextSubmit: HandleTodayTextSubmit = (e) => {
    e.preventDefault();

    if (todayText.length === 0) return;

    const todayKey = getDateKey();

    const newNotes = { ...notes, [todayKey]: todayText };
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };
  return (
    <main className="max-w-[75ch] m-auto px-4 py-16 grid gap-8">
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
          <Skeleton className="h-6 mb-4" />
          <Skeleton className="h-40" />
          <Skeleton className="h-8 mt-2 ml-auto w-32 !rounded-large" />
        </div>
      )}
    </main>
  );
}
