import React from "react";
import OpenApiTabs from "../OpenApiTabs";

export default function MimeTabs(props) {
  return (
    <OpenApiTabs
      {...props}
      containerClassName="openapi-tabs__mime-container"
      listClassName="openapi-tabs__mime-list-container"
    />
  );
}