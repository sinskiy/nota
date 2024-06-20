import { useEffect, useState } from "react";

interface Props {}

export default function Settings({}: Props) {
  const [template, setTemplate] = useState("");
  useEffect(() => {
    const savedTemplate = localStorage.getItem("template");
    savedTemplate && setTemplate(savedTemplate);
  }, []);
  function saveTemplate() {
    localStorage.setItem("template", template);
  }
  return (
    <div className="card p-8">
      <section>
        <header>
          <h2>Template</h2>
        </header>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="card bg-onSurface w-full"
          rows={6}
          name="template"
          id="template"
        ></textarea>
      </section>
      <form action="" method="dialog" className="flex gap-4 mt-8">
        <button onClick={saveTemplate} className="text-button">
          Save
        </button>
        <button className="text-button">Close</button>
      </form>
    </div>
  );
}
