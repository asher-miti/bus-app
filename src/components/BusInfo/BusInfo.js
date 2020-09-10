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

  // Get current time of day (only minutes) for calculating bus ETA
  const d = new Date();
  const n = d.getMinutes();

  return (
    <div className={styles.busCard}>
      <h6 className={styles.busInfoHeader}>{busStopInfo.name}</h6>
      <p>{busStopInfo.description}</p>
      {busList.all &&
        busList.all.map((departure, i) => (
          <li style={{ listStyleType: "none" }} key={i}>
            <span style={{ display: "inline-block" }}>
              <h6 className={styles.busInfo}>
                <span className={styles.busItem}>{departure.line}</span> <small>towards</small>{" "}
                {departure.direction}
              </h6>
              <h6 className={styles.busInfo}>
                <strong>
                  {departure.best_departure_estimate.split(":")[1] - n < 0
                    ? departure.best_departure_estimate.split(":")[1] - n + 60 + "min"
                    : departure.best_departure_estimate.split(":")[1] - n === 0
                    ? "Due"
                    : departure.best_departure_estimate.split(":")[1] - n + "min"}
                </strong>{" "}
              </h6>
            </span>
          </li>
        ))}
    </div>
  );
};

export default BusInfo;