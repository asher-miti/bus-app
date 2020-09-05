import React from "react";

import compass from "../../images/compass.png";
import styles from "./Locate.module.css";

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img className={styles.compass} src={compass} alt="compass - locate me" />
    </button>
  );
};

export default Locate;
