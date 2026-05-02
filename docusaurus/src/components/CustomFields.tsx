import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";
import { useMemo } from "react";

const AppName = () => {
  const { siteConfig } = useDocusaurusContext();
  return siteConfig?.customFields?.appName || "SEMOSS";
};

export const ShowVideoTag = (props: any) => {
  const { children } = props;
  const { siteConfig } = useDocusaurusContext();
  let showVideoTag = false;
  if (siteConfig.customFields?.hasOwnProperty("showVideo")) {
    showVideoTag = siteConfig.customFields?.showVideo === "true";
  }
  if (showVideoTag) {
    return <>{children}</>;
  }
  return null;
};

export const ShowIntenralDockerTag = (props: any) => {
  const { children } = props;
  const { siteConfig } = useDocusaurusContext();
  let showInternalDockerTag = false;
  if (siteConfig.customFields?.hasOwnProperty("showInternalDocker")) {
    showInternalDockerTag =
      siteConfig.customFields?.showInternalDocker === "true";
  } 
  if (showInternalDockerTag) {
    return <>{children}</>;
  }
  return null;
};

export const DynamicCodeBlock = (props: any) => {
  const { children, noQuotes = false } = props;
  const { siteConfig } = useDocusaurusContext();
  const appName = String(siteConfig?.customFields?.appName || "SEMOSS");
  const childToBeProcessed = useMemo(() => {
    let count = 0;
    let tempChildren = children;
    while (tempChildren?.props?.children) {
      if (
        tempChildren.props.children &&
        typeof tempChildren.props.children === "string"
      ) {
        return tempChildren.props.children;
      }
      tempChildren = tempChildren.props.children;
    }
  }, []);
  return (
    <CodeBlock>
      {childToBeProcessed.replaceAll(
        "{<AppName />}",
        noQuotes ? appName : `"${appName}"`,
      )}
    </CodeBlock>
  );
};

export const WrapVariable = (props: any) => {
  const { children } = props;
  const { siteConfig } = useDocusaurusContext();
  console.log("children", children);
  const childToBeProcessed = useMemo(() => {
    let count = 0;
    let tempChildren = children;
    while (tempChildren.props.children) {
      if (
        tempChildren.props.children &&
        typeof tempChildren.props.children === "string"
      ) {
        return tempChildren.props.children;
      }
      tempChildren = tempChildren.props.children;
    }
  }, []);
  return (
    <header>
      <h1>
        {childToBeProcessed.replaceAll(
          "'AppName'",
          siteConfig?.customFields?.appName,
        )}
      </h1>
    </header>
  );
};

export default AppName;
