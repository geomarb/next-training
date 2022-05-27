import Link from "next/link";

import classes from "./styles.module.css";

export default function Button({ link, children, onClick }) {
  return link ? (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}
