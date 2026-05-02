import React from "react";
import OpenApiTabs from "../OpenApiTabs";

export default function DiscriminatorTabs(props) {
  return (
    <OpenApiTabs
      {...props}
      containerClassName="openapi-tabs__discriminator-container"
      listClassName="openapi-tabs__discriminator-list-container"
    />
  );
}