import { Button } from "../../ui";
import { DateIcon, AddressIcon, ArrowRightIcon } from "../../icons";
import classes from "./styles.module.css";

export default function EventItem({ id, title, location, date, image }) {
  const dtOpt = { day: "numeric", month: "long", year: "numeric" };
  const humanReadableDate = new Date(date).toLocaleDateString("pt-BR", dtOpt);
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
