import Image from "next/image";

import classes from "./styles.module.css";

export default function Hero(props) {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/geo.jpeg"
          alt="An image showing Geo"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Geo</h1>
      <p>This is my blog</p>
    </section>
  );
}
