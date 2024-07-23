import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_button_group}>
        <Link className={styles.navbar_button} href="/">
          <Image
            src="/img/Navbar/home.svg"
            width={40}
            height={40}
            alt="home page"
            className={styles.button_icon}
          ></Image>
          <span className={styles.button_text}>首页</span>
        </Link>
        <Link className={styles.navbar_button} href="/overview">
          <Image
            src="/img/Navbar/rice.svg"
            width={40}
            height={40}
            alt="rice"
            className={styles.button_icon}
          ></Image>
          <span className={styles.button_text}>路过人间</span>
        </Link>
        <Link className={styles.navbar_button} href="/creation">
          <Image
            src="/img/Navbar/Group.svg"
            width={40}
            height={40}
            alt="Group"
            className={styles.button_icon}
          ></Image>
          <span className={styles.button_text}>二创</span>
        </Link>
        <Link className={styles.navbar_button} href="/information">
          <Image
            src="/img/Navbar/Vector.svg"
            width={40}
            height={40}
            alt="Vector"
            className={styles.button_icon}
          ></Image>
          <span className={styles.button_text}>周边信息</span>
        </Link>
        <Link className={styles.navbar_button} href="/inform">
          <span className={styles.button_text}>活动通知</span>
        </Link>
      </div>
    </nav>
  );
};
