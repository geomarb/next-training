import classes from "./styles.module.css";

export default function EventSummary({ title }) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
