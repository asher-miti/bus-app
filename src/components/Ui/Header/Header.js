import React from "react";

import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <h2 className={styles.logo}>Bus Times London</h2>
  </header>
);

export default Header;
