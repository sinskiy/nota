import { useEffect, useState } from "react";
import SettingsTemplate from "./SettingsTemplate";

interface Props {}

export type SetTemplate = (newTemplate: string, templateIndex: number) => void;
export type DeleteTemplate = (templateIndex: number) => void;

export default function Settings({}: Props) {
  const [templates, setTemplates] = useState<string[]>([]);
  const [defaultTemplate, setDefaultTemplate] = useState(0);
  useEffect(() => {
    const savedTemplates = localStorage.getItem("templates");
    savedTemplates && setTemplates(JSON.parse(savedTemplates));

    const savedDefaultTemplate = localStorage.getItem("defaultTemplate");
    savedDefaultTemplate && setDefaultTemplate(Number(savedDefaultTemplate));
  }, []);

  const setTemplate: SetTemplate = (newTemplate, templateIndex) => {
    const newTemplates = templates.map((template, i) => {
      if (i === templateIndex) {
        return newTemplate;
      } else {
        return template;
      }
    });
    setTemplates(newTemplates);
  };
  function addTemplate() {
    setTemplates([...templates, ""]);
  }
  const deleteTemplate: DeleteTemplate = (templateIndex) => {
    setTemplates(templates.filter((template, i) => templateIndex !== i));
  };

  function updateStorage() {
    localStorage.setItem("templates", JSON.stringify(templates));
    localStorage.setItem("defaultTemplate", String(defaultTemplate));
  }
  return (
    <div className="card p-8">
      <section>
        <header>
          <h2>Templates</h2>
        </header>
        <ul>
          {templates.map((template, i) => (
            <SettingsTemplate
              template={template}
              index={i}
              defaultTemplate={defaultTemplate}
              setDefaultTemplate={setDefaultTemplate}
              setTemplate={setTemplate}
              deleteTemplate={deleteTemplate}
              key={i}
            />
          ))}
        </ul>
        <button className="text-button mt-4" onClick={addTemplate}>
          Add new template
        </button>
      </section>
      <form action="" method="dialog" className="flex gap-4 mt-8">
        <button onClick={updateStorage} className="text-button">
          Save
        </button>
        <button className="text-button">Close</button>
      </form>
    </div>
  );
}
