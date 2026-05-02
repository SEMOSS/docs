import React from "react";
import OpenApiTabs from "../OpenApiTabs";

export default function SchemaTabs({ className, children, ...props }) {
  return (
    <OpenApiTabs
      {...props}
      className={className}
      containerClassName="openapi-tabs__schema-container"
      listClassName="openapi-tabs__schema-list-container"
    >
      {children}
    </OpenApiTabs>
  );
}
