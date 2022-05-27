import { Button } from "../../ui";
import classes from "./styles.module.css";

export default function ResultsTitle({ date }) {
  const humanReadableDate = new Date(date).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}
