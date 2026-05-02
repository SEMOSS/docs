import React from "react";
import OpenApiTabs from "../OpenApiTabs";

export default function ApiTabs(props) {
  return (
    <OpenApiTabs
      {...props}
      containerClassName="openapi-tabs__api-container"
      listClassName="openapi-tabs__api-list-container"
    />
  );
}