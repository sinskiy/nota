import { Notes } from "@/app/page";
import Calendar from "./ui/Calendar";

interface Props {
  previousDays: Notes;
}

export default function PreviousDays({ previousDays }: Props) {
  const asArray = Object.entries(previousDays);
  return (
    <>
      {asArray.length ? (
        <section>
          <h2>Previous days</h2>
          <Calendar />
          {/* <input type="date" name="date" id="date" />
    <h3>Note</h3>
    <p>
      Contradictions do not exist. Whenever you think that you are facing a
      contradiction, check your premises. You will find that one of them is
      wrong.
    </p> */}
          <ul>
            {asArray.map(([date, text]) => (
              <li key={date}>
                <h3>{new Date(date).toLocaleDateString()}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
