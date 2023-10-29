import React from "react";

export default function Node(props) {
  const [metrics, setMetrics] = React.useState();

  function getColor(metric) {
    if (metric < 85) {
      return "green";
    } else if (metric < 95) {
      return "yellow";
    } else {
      return "red";
    }
  }

  function getMetrics() {
    return fetch("/api/metrics")
      .then((r) => {
        return r.json();
      })
      .catch((err) => {
        return err;
      });
  }

  React.useEffect(() => {
    getMetrics().then((metrics) => {
      let newest_metric;
      for (const met of metrics) {
        if (met.caption === props.node.node_name) {
          if (newest_metric === undefined) {
            newest_metric = met;
          } else {
            if (met.datetime > newest_metric.datetime) {
              newest_metric = met;
            }
          }
        }
      }
      setMetrics(newest_metric);
    });
  }, []);

  return (
    <div
      className="node"
      onClick={() => {
        props.chooseNodeStat(props.node);
      }}
    >
      <div className="node__description">
        <p
          className="node__status"
          style={{ backgroundColor: `${props.node.status_color}` }}
        ></p>
        <p className="node__name">
          <span></span>
          {props.node.node_name}
        </p>
      </div>

      {metrics ? (
        <div className="node__metrics">
          <p>
            {" "}
            CPU:{" "}
            <span style={{ color: `${getColor(metrics.cpu_utilization)}` }}>
              {metrics.cpu_utilization}%
            </span>
          </p>
          <p>
            {" "}
            RAM:{" "}
            <span style={{ color: `${getColor(metrics.memory_utilization)}` }}>
              {metrics.memory_utilization}%
            </span>
          </p>
          <p>
            {" "}
            DISK:{" "}
            <span style={{ color: `${getColor(metrics.disk_utilization)}` }}>
              {metrics.disk_utilization}%
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
