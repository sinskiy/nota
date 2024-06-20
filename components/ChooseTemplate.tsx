import { RefObject, useState } from "react";

interface Props {
  dialogRef: RefObject<HTMLDialogElement>;
  templates: string[];
  setTodayText: SetState<string>;
}

export default function ChooseTemplate({
  dialogRef,
  templates,
  setTodayText,
}: Props) {
  const [chosenTemplate, setChosenTemplate] = useState(0);

  return (
    <div className="card p-8">
      <header>
        <h2>Choose template</h2>
        <p className="text-text-variant mt-1">
          Click on template to select
          <br /> Warning: will override your current note
        </p>
      </header>
      <ul className="grid gap-2">
        {templates.map((template, i) => (
          <li
            className="card bg-onSurface has-[:checked]:bg-primary has-[:checked]:text-text-primary relative"
            key={template}
          >
            <label htmlFor={`${template}-template-choose`}>{template}</label>
            <input
              checked={chosenTemplate === i}
              onChange={() => setChosenTemplate(i)}
              type="radio"
              name="template-choose"
              id={`${template}-template-choose`}
              className="absolute inset-0 opacity-0"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => setTodayText(templates[chosenTemplate])}
        className="text-button mt-4 mr-2"
      >
        Save
      </button>
      <button
        className="outlined-button mt-4"
        onClick={() => dialogRef.current?.close()}
      >
        Close
      </button>
    </div>
  );
}
