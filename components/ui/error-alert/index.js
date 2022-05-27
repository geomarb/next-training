import Button from "../button";
import classes from "./styles.module.css";

export default function ErrorAlert({ message, link, buttonTitle }) {
  return (
    <>
      <div className={classes.alert}>
        <p>{message}</p>
        {buttonTitle && link && <Button link={link}>{buttonTitle}</Button>}
      </div>
    </>
  );
}
