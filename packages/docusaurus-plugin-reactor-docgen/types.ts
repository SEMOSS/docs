export interface SidebarItemDoc {
  type: "doc";
  id: string;
  label?: string;
  className?: string;
}

export interface PluginOptions {
  id?: string;
  docsPlugin?: string;
  docsPluginId: string;
  config: {
    [key: string]: APIOptions;
  };
}

export interface LoadedContent {
  loadedApi: ReactorDocumentation[];
  // loadedDocs: DocPageMetadata[]; TODO: cleanup
}

export interface APIOptions {
  reactorsResourceLocator: string;
  outputDir: string;
  sidebarOptions?: SidebarOptions;
  apiSpecPath?: string;
  /// default false
  groupReactors?: boolean;
  MONOLITH_API_URL: string;
  version?: string;
}

export interface SidebarOptions {
  groupPathsBy?: string;
  categoryLinkSource?: "info" | "tag" | "auto";
  customProps?: { [key: string]: unknown };
  sidebarCollapsible?: boolean;
  sidebarCollapsed?: boolean;
  sidebarGenerators?: SidebarGenerators;
}


export interface SidebarGenerators {
  createDocItem?: ApiDocItemGenerator;
}


export type ApiDocItemGenerator = (
  context: { sidebarOptions: SidebarOptions; basePath: string }
) => SidebarItemDoc;

export interface ReactorDocumentation {
  id: string;
  title: string;
  sidebar_label: string;
  description: string;
  api: string;
  requiredKeys: string[];
  optionalKeys: string[];
  keyDescriptions: { [key: string]: string };
  usage: string[];
}

export interface ReactorMetadata {
  frontmatter: {
    id: string;
    title: string;
    sidebar_label: string;
    description: string;
    api: string;
  };
  content: {
    description: string;
    requiredKeys: string[];
    optionalKeys: string[];
    keyDescriptions: { [key: string]: string };
    usage: string[];
  };
}
