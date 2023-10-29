import React from "react";
import { AllInfo } from "../contexts/Context";

export default function FirstColumn() {
  const full_data = React.useContext(AllInfo);

  const [inf, setInf] = React.useState([]);
  const [statusOfService, setStatusOfService] = React.useState({
    UP: 0,
    DOWN: 0,
    SHUTDOWN: 0,
    WARNING: 0,
    CRITICAL: 0,
    UNREACHABLE: 0,
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
      setStatusOfService({ ...statuses });
    }
  }, [full_data]);

  return (
    <div className="info">
      <p className="info__details info__details_title">State</p>
      <p className="info__details info__details_title">Nodes</p>
      <p className="info__details">Critical</p>
      <p className="info__details">
        {statusOfService.CRITICAL ? statusOfService.CRITICAL : 0}
      </p>
      <p className="info__details">Warning</p>
      <p className="info__details">
        {statusOfService.WARNING ? statusOfService.WARNING : 0}
      </p>
      <p className="info__details">OK</p>
      <p className="info__details">
        {statusOfService.UP ? statusOfService.UP : 0}
      </p>
      <p className="info__details">Down</p>
      <p className="info__details">
        {statusOfService.DOWN ? statusOfService.DOWN : 0}
      </p>
      <p className="info__details">Shutdown</p>
      <p className="info__details">
        {statusOfService.SHUTDOWN ? statusOfService.SHUTDOWN : 0}
      </p>
      <p className="info__details">Unreachable</p>
      <p className="info__details">
        {statusOfService.UNREACHABLE ? statusOfService.UNREACHABLE : 0}
      </p>
    </div>
  );
}
