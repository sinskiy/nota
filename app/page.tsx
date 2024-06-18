export default function Home() {
  return (
    <main>
      <section>
        <h2>Daily note</h2>
        <form action="" method="get">
          <textarea
            name="daily"
            id="daily"
            placeholder="Today I accomplished a lot. I did this and this"
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </section>
      <section>
        <h2>Previous days</h2>
        <input type="date" name="date" id="date" />
        <h3>Note</h3>
        <p>
          Contradictions do not exist. Whenever you think that you are facing a
          contradiction, check your premises. You will find that one of them is
          wrong.
        </p>
      </section>
    </main>
  );
}
