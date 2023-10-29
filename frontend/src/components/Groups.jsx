import React, { useContext } from "react";
import { AllInfo } from "../contexts/Context";

export default function Groups(props) {
  const full_data = useContext(AllInfo);

  const [inf, setInf] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  React.useEffect(() => {
    setInf(full_data);
    let un_group = [];
    inf.map((i) => {
      let gr = i["group_name"];
      if (un_group.indexOf(gr) === -1) {
        un_group.push(gr);
      }
    });
    setGroups(un_group);
  }, [full_data]);

  return (
    <div className="groups">
      {groups.map((group, j) => (
        <div className="group">
          <p
            className="group__name"
            key={j}
            onClick={() => props.filterFullData(group)}
          >
            {group}
          </p>
        </div>
      ))}
      <div className="group">
        <p className="group__name" onClick={() => props.filterFullData()}>
          Все группы
        </p>
      </div>
    </div>
  );
}
