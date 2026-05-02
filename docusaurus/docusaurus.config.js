// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import dotenv from 'dotenv';
dotenv.config();

import { themes as prismThemes } from "prism-react-renderer";

/**
 * @param {Array<Record<string, any>>} sourceToUpdate
 * @param {string} [valToUpdate]
 * @param {string | undefined} [appName]
 * @returns {Array<Record<string, any>>}
 */
const appNameUpdater = (
  sourceToUpdate,
  valToUpdate = "SEMOSS",
  appName = process.env.APP_NAME
) => {
  return sourceToUpdate.map((item) => ({
    ...item,
    ...(Object.hasOwn(item, "label") && {
      label: item?.label?.replace(valToUpdate, appName) || item.label,
    }),
    ...(Object.hasOwn(item, "items") && {
      items: item?.items
        ? appNameUpdater(item.items, valToUpdate, appName)
        : item.items,
    }),
  }));
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: process.env.APP_NAME || "SEMOSS",
  tagline: `${process.env.APP_NAME || "SEMOSS"} Documentation`,
  favicon: "img/favicon.ico",
  organizationName:  process.env.APP_NAME || "SEMOSS",
  projectName: "documentation",
  deploymentBranch: "main",
  url: "https://semoss.github.io", // Your website URL
  baseUrl: "/documentation",
  trailingSlash: false,
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          docItemComponent: "@theme/ApiItem",
          routeBasePath: "/",
          remarkPlugins: [
            [
              require('./remark/remarkReplaceFEUrl'),
              {
                replacements: [
                  { searchValue: 'SEMOSSName', replaceValue: process.env.APP_NAME, isRegex: false, flags: 'gi' },
                  { searchValue: 'MonoLithURL', replaceValue: process.env.MONOLITH_API_URL, isRegex: false, flags: 'gi' },
                  { searchValue: 'support-email', replaceValue: process.env.SUPPORT_EMAIL, isRegex: false, flags: 'gi' },
                ],
              },
            ],
          ],
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            ...args
          }) => {
            const sidebarItems = await defaultSidebarItemsGenerator({ ...args });
            const updatedSidebarItems = appNameUpdater(sidebarItems, 'SEMOSS', process.env.APP_NAME);
            return updatedSidebarItems;
          },
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  plugins: [
    function customWebpackConfig() {
      return {
        name: 'custom-webpack-config',
        configureWebpack(_config, isServer) {
          if (isServer) {
            return {};
          }
          return {
            resolve: {
              fallback: {
                path: false,
              },
            },
          };
        },
      };
    },
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        removeDefaultStemmer: true,
        forceIgnoreNoIndex: true,
        indexDocs: true,
        indexPages: true,
      },
    ],
    [
      require.resolve("docusaurus-plugin-openapi-docs"),
      {
        id: "openapi-reactor",
        docsPluginId: "classic",
        config: {
          next: {
            //specPath: "https://raw.githubusercontent.com/SEMOSS/Monolith/refs/heads/swagger-feature/swagger-ui/swagger.json",
            specPath: "examples/semoss-api-spec.json",
            disableCompression: true,
            outputDir: "docs/developer/semoss-core-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            //infoTemplate: "templates/info.mustache",
          },
          v5_0: {
            specPath: "examples/semoss-api-spec5.json",
            disableCompression: true,
            outputDir: "versioned_docs/version-5.0.0/developer/semoss-core-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          v4_3: {
            specPath: "examples/semoss-api-spec4.json",
            disableCompression: true,
            outputDir: "versioned_docs/version-4.3.2/developer/semoss-core-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            }, 
          }, 
        },
      },
    ],
    [
      require.resolve("docusaurus-plugin-reactor-docgen"),
      {
        id: 'reactor-docgen',
        docsPluginId: 'classic',
        config: {
          // You can add configuration options here if needed
          reactor: {
            txtDir: './reactorOverview', // directory containing .txt files
            //reactorsResourceLocator: 'http://localhost:9090/Monolith',
            reactorsResourceLocator: 'reactors/All.json',
            outputDir: './docs/developer/Reactors',
            apiSpecPath: 'reactors/reactorPixelOAS.json',
            groupReactors: true,
            MONOLITH_API_URL: process.env.MONOLITH_API_URL,
            version: '5.0.0',
          },
          vintage:{
            txtDir: './reactorOverview',
            reactorsResourceLocator: 'reactors/4-3-2.json',
            outputDir: './versioned_docs/version-4.3.2/developer/ReactorsRefactor',
            apiSpecPath: 'reactors/reactorPixelOAS.json',
            groupReactors: true,
            MONOLITH_API_URL: process.env.MONOLITH_API_URL,
          }
        },

      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title:  process.env.APP_NAME ||"SEMOSS",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            label: "Developer",
            position: "left",
            items: [
              {
                label: "Reactors",
                to: "/developer/Reactors",
              },
              {
                label: `${process.env.APP_NAME || 'SEMOSS'} API`,
                to: "/category/ai-core-api",
              },
            ],
          },


          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()}  ${process.env.APP_NAME || "SEMOSS"} Documentation`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      languageTabs: [
        {
          highlight: "javascript",
          language: "javascript",
          logoClass: "javascript",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "r",
          language: "r",
          logoClass: "r",
        },
      ],
    }),
  themes: ["docusaurus-theme-openapi-docs"],
  customFields: {
    appName: process.env.APP_NAME,
    showVideo: process.env.SHOW_VIDEO,
    showInternalDocker: process.env.SHOW_INTERNAL_DOCKER,
  },
};

export default config;
