import React from "react";
import OpenApiTabs from "../OpenApiTabs";

export default function OperationTabs(props) {
  return (
    <OpenApiTabs
      {...props}
      containerClassName="openapi-tabs__operation-container"
      listClassName="openapi-tabs__operation-list-container"
    />
  );
}