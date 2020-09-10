import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import styles from "./BusInfo.module.css";

const apiKey = process.env.REACT_APP_TRANSPORT_API_KEY;
const apiId = process.env.REACT_APP_TRANSPORT_API_ID;
const url = "https://transportapi.com/v3/uk/bus/stop";

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

  // function howLongTill(timeString) {
  //   let current = new Date();
  //   let today = current.getHours() * 60 + current.getMinutes();
  //   let bus = timeString.split(":");
  //   let h = parseFloat(bus[0]);
  //   let m = parseFloat(bus[1]);

  //   let n = h * 60 + m - today;
  //   return n > 0 ? n + " min." : "gone";
  // }

  // Get current time of day (only minutes) for calculating bus ETA
  const d = new Date();
  const n = d.getMinutes();

  return (
    <div className={styles.busCard}>
      <h5 className={styles.busInfoHeader}>{busStopInfo.name}</h5>
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
