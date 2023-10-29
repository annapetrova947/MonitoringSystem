import React from "react";
import { CurrentNodeInfo } from "../contexts/Context";
import { Chart } from "./NodeChart";

export default function FirstColumn() {
  const [metricsOfNode, setMetricsOfNode] = React.useState();

  const node = React.useContext(CurrentNodeInfo);

  if (node.node_name) {
    return (
      <div className="column metrics">
        <p className="metrics__node">{node.node_name}</p>

        <Chart metrics={metricsOfNode} />

        <div className="metrics__interface">
          <p className="metrics__interface-name">Interface</p>
          {node.interface_name ? (
            <div>
              <p>name: {node.interface_name}</p>
              <p>status: {node.interface_status === "3" ? "UP" : "DOWN"}</p>
            </div>
          ) : (
            <p>Interface not found</p>
          )}
        </div>
        <div>
          <p className="metrics__admin">Administrator </p>
          <p>
            {node.firstname} {node.lastname}
          </p>
          <p>{node.email} </p>
        </div>
        <div>
          <p className="metrics__app">App </p>

          <p>{node.app_name} </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="metrics__choose">
        <p>Choose node to get statistic</p>
      </div>
    );
  }
}
