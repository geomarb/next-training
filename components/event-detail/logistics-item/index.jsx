import classes from "./styles.module.css";

export default function LogisticsItem({ icon: Icon, children }) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}
