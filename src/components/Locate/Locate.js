import React from "react";

import compass from "../../images/compass.png";
import styles from "./Locate.module.css";

const Locate = ({ panTo, setLocation }) => {
  const locate = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setLocation({ lat, lng });
        panTo({ lat, lng });
      },
      () => null
    );
  };

  return (
    <button className={styles.locate} onClick={locate}>
      <img className={styles.compass} src={compass} alt="compass - locate me" />
    </button>
  );
};

export default Locate;
