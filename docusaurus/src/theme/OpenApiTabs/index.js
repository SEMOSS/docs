import React from "react";
import clsx from "clsx";
import Tabs from "@theme/Tabs";

export default function OpenApiTabs({
  children,
  className,
  containerClassName,
  listClassName,
  ...props
}) {
  return (
    <div className={containerClassName}>
      <Tabs {...props} className={clsx(listClassName, className)}>
        {children}
      </Tabs>
    </div>
  );
}