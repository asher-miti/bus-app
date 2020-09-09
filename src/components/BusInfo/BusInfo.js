import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./BusInfo.module.css";

const apiKey = process.env.REACT_APP_TRANSPORT_API_KEY;
const apiId = process.env.REACT_APP_TRANSPORT_API_ID;
const url = "https://transportapi.com/v3/uk/bus/stop";

// Next bus is departing in {5} minutes, the next one after that is in {10}
// Google directions => from current location to clicked bus stop (cool calucation)
// maybe that would overcomplicate things, so you can do "3 to 4 miles per hour" and use that for measurment
// and then use this distance (blow)
//     { accuracy: 20, distance: 231 }
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
  console.log(n);

  return (
    <div>
      <h5>{busStopInfo.name}</h5>
      <p>{busStopInfo.description}</p>
      {busList.all &&
        busList.all.map((departure, i) => (
          <li style={{ listStyleType: "none" }} key={i}>
            <span style={{ display: "inline-block" }}>
              <h6 className={styles.busInfo}>
                <span className={styles.busItem}>{departure.line}</span> <small>towards</small>{" "}
                {departure.direction}
              </h6>
              <h5 className={styles.busInfo}>
                <strong>
                  {departure.best_departure_estimate.split(":")[1] - n === 0
                    ? "Due"
                    : departure.best_departure_estimate.split(":")[1] - n}
                </strong>{" "}
                min
              </h5>
            </span>
          </li>
        ))}
    </div>
  );
};

export default BusInfo;
