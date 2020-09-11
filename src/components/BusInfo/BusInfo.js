import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./BusInfo.module.css";

const apiKey = process.env.REACT_APP_TRANSPORT_API_KEY;
const apiId = process.env.REACT_APP_TRANSPORT_API_ID;
const url = "https://transportapi.com/v3/uk/bus/stop";

const BusInfo = ({ busStopInfo }) => {
  const [busList, setBusList] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getBusTimes = async () => {
      try {
        const result = await axios(`${url}/${busStopInfo.atcocode}/live.json`, {
          params: {
            app_id: apiId,
            app_key: apiKey,
            group: "no",
            limit: 10,
            nextbuses: "yes",
          },
        });

        setBusList(result.data.departures);
        console.log(result.data.departures);
      } catch (error) {
        setIsError(true);
      }
    };

    getBusTimes();
  }, [busStopInfo.atcocode]);

  // Logic for calculating estimated time of arrival for buses
  const calculateDueMinutes = (minutes) => {
    const currentMinutes = new Date().getMinutes();

    if (minutes - currentMinutes < 0) {
      return minutes - currentMinutes + 60;
    }

    return minutes - currentMinutes;
  };

  return (
    <div className={styles.busCard}>
      <h3>{busStopInfo.name}</h3>
      <p>{busStopInfo.description}</p>
      {busList.all &&
        busList.all.map(({ line, direction, best_departure_estimate }, i) => {
          const minutes = best_departure_estimate.split(":")[1];
          const dueMinutes = calculateDueMinutes(minutes);

          return (
            <li style={{ listStyleType: "none" }} key={i}>
              <span className={styles.busDetails}>
                <h3 className={styles.busInfo}>
                  <span className={styles.busItem}>{line}</span> <small>towards</small>
                  {direction}
                </h3>
                <h3 className={styles.busInfo}>
                  <strong>{dueMinutes ? `${dueMinutes} minutes` : "Due"}</strong>
                </h3>
              </span>
            </li>
          );
        })}
    </div>
  );
};

export default BusInfo;
