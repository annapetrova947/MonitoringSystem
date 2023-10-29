import React from "react";
import Status from "./Status";
import MainInfo from "./MainInfo";
import Groups from "./Groups";

export default function FirstColumn(props) {
  return (
    <div className="column">
      <Status />
      <MainInfo />
      <Groups filterFullData={props.filterFullData} />
    </div>
  );
}
