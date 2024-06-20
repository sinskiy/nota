import { DeleteTemplate, SetTemplate } from "./Settings";

interface Props {
  template: string;
  index: number;
  defaultTemplate: number;
  setDefaultTemplate: SetState<number>;
  setTemplate: SetTemplate;
  deleteTemplate: DeleteTemplate;
}

export default function SettingsTemplate({
  template,
  index,
  defaultTemplate,
  setDefaultTemplate,
  setTemplate,
  deleteTemplate,
}: Props) {
  return (
    <li className="mt-2">
      <textarea
        value={template}
        onChange={(e) => setTemplate(e.target.value, index)}
        className="card bg-onSurface w-full"
        rows={6}
        name={index + "-template"}
        id={index + "-template"}
      ></textarea>
      <div className="flex mt-2">
        <button onClick={() => deleteTemplate(index)} className="icon-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
        <div className="relative text-button">
          <label htmlFor={index + "-template-default"}>default</label>
          <input
            checked={defaultTemplate === index}
            onChange={() => setDefaultTemplate(index)}
            className="absolute inset-0 opacity-0"
            type="radio"
            id={index + "-template-default"}
            name="template-default"
          />
        </div>
      </div>
    </li>
  );
}
