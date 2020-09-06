import React from "react";

import logo from "../../../images/logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="London Bus Times" />
    </header>
  );
};

export default Header;
