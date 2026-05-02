import React from "react";
import OpenApiTabs from "../../OpenApiTabs";

export default function CodeTabs(props) {
  return (
    <OpenApiTabs
      {...props}
      containerClassName="openapi-tabs__code-container"
      listClassName="openapi-tabs__code-list-container"
    />
  );
}