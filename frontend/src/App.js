import React from "react";
import FirstColumn from "./components/FirstColumn.jsx";
import NodesList from "./components/NodesList.jsx";
import NodeStatistic from "./components/NodeStatistic.jsx";
import { AllInfo } from "./contexts/Context.js";
import { CurrentNodeInfo } from "./contexts/Context.js";
import { NodesInGroup } from "./contexts/Context.js";
import { CurrentNodeMetrics } from "./contexts/Context.js";

function App() {
  const [fullData, setFullData] = React.useState([]);
  const [currentData, setCurrentData] = React.useState([]);
  const [currentNode, setCurrentNode] = React.useState({});
  const [currentMetrics, setCurrentMetrics] = React.useState();

  let render = 0;
  // get information from server every 1 minute

  setInterval(() => {
    render += 1;
  }, 60000);

  React.useEffect(() => {
    fetch("/api/groups")
      .then((r) => {
        r.json().then((res) => setFullData(res));
      })
      .catch((err) => {
        return err;
      });
  }, [render]);

  React.useEffect(() => {
    setCurrentData([...fullData]);
  }, [fullData]);

  function getMetrics() {
    return fetch("/api/metrics")
      .then((r) => {
        return r.json();
      })
      .catch((err) => {
        return err;
      });
  }

  function filterFullData(group) {
    let arr;
    if (group) {
      arr = fullData.filter((node) => node.group_name === group);
    } else {
      arr = fullData;
    }

    setCurrentData([...arr]);
  }

  function chooseNodeStat(node) {
    setCurrentNode(node);
    getMetrics().then((metrics) => {
      const met_arr = [];
      for (const met of metrics) {
        if (met.caption === node.node_name) {
          met_arr.push(met);
        }
      }
      setCurrentMetrics([...met_arr]);
    });
  }

  return (
    <div className="root">
      <AllInfo.Provider value={fullData}>
        <NodesInGroup.Provider value={currentData}>
          <CurrentNodeInfo.Provider value={currentNode}>
            <CurrentNodeMetrics.Provider value={currentMetrics}>
              <FirstColumn filterFullData={filterFullData} />
              <NodesList chooseNodeStat={chooseNodeStat} />
              <NodeStatistic />
            </CurrentNodeMetrics.Provider>
          </CurrentNodeInfo.Provider>
        </NodesInGroup.Provider>
      </AllInfo.Provider>
    </div>
  );
}

export default App;
