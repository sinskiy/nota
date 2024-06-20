import { useState } from "react";

interface Props {
  templates: string[];
  setTodayText: SetState<string>;
}

export default function ChooseTemplate({ templates, setTodayText }: Props) {
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
      <form action="" method="dialog" className="flex gap-2">
        <button
          onClick={() => setTodayText(templates[chosenTemplate])}
          type="submit"
          className="text-button mt-4"
        >
          Save
        </button>
        <button type="submit" className="outlined-button mt-4">
          Close
        </button>
      </form>
    </div>
  );
}
