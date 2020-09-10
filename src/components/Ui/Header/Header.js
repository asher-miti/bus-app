import React from "react";

import logo from "../../../images/logo.png";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <img className={styles.logo} src={logo} alt="Bus Times London" />
  </header>
);

export default Header;
