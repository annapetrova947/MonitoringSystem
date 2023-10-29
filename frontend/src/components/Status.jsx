import React from "react";
import { AllInfo } from "../contexts/Context";

export default function Status() {
  const full_data = React.useContext(AllInfo);

  const [inf, setInf] = React.useState([]);
  const [statusOfService, setStatusOfService] = React.useState({
    status: "",
    color: "",
  });
  React.useEffect(() => {
    if (full_data) {
      setInf(full_data);
      let statuses = {};
      inf.map((i) => {
        let status = i["status_description"];
        if (statuses.hasOwnProperty(status)) {
          statuses[status] += 1;
        } else {
          statuses[status] = 1;
        }
      });
      if (statuses.hasOwnProperty("CRITICAL")) {
        setStatusOfService({
          status: "CRITICAL",
          color: "red",
        });
      } else {
        if (statuses.hasOwnProperty("WARNING")) {
          setStatusOfService({
            status: "WARNING",
            color: "yellow",
          });
        } else {
          setStatusOfService({
            status: "OK",
            color: "green",
          });
        }
      }
    }
  }, [full_data]);

  return (
    <div className="status">
      <p className="status__details">
        Статус:{" "}
        <span style={{ color: `${statusOfService["color"]}` }}>
          {statusOfService["status"]}
        </span>
      </p>
    </div>
  );
}
