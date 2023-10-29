import React, { useContext } from "react";
import { NodesInGroup } from "../contexts/Context";
import Node from "./Node";

export default function NodesList(props) {
  const full_data = useContext(NodesInGroup);

  const [inf, setInf] = React.useState([]);

  React.useEffect(() => {
    setInf(full_data);
  }, [full_data]);

  if (inf.length === 0) {
    return <p>downloading</p>;
  } else {
    return (
      <div className="column column_nodes">
        {inf.map((node, i) => (
          <Node key={i} node={node} chooseNodeStat={props.chooseNodeStat} />
        ))}
      </div>
    );
  }
}
