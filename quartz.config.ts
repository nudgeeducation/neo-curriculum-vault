import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * NEO Curriculum Vault
 * Quartz 4 configuration for the Nudge Education Online curriculum library
 *
 * Brand reference (matches the Nudge Policy Vault):
 *   Navy   #1A2E3B   Primary (dark)
 *   Teal   #2AB3A0   Accent
 *   Cream  #F7F7F5   Background
 *   Charcoal #2D3436 Body text
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "NEO Curriculum Vault",
    pageTitleSuffix: " · Nudge Education Online",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-GB",
    baseUrl: "nudgeeducation.github.io/neo-curriculum-vault",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      "archive",
      "**/*.md.bak",
      "**/.DS_Store",
    ],
    defaultDateType: "modified",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Fraunces",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#F7F7F5",
          lightgray: "#E8ECEF",
          gray: "#6B7B8D",
          darkgray: "#2D3436",
          dark: "#1A2E3B",
          secondary: "#1A2E3B",
          tertiary: "#2AB3A0",
          highlight: "rgba(42, 179, 160, 0.10)",
          textHighlight: "#2AB3A033",
        },
        darkMode: {
          light: "#1A2E3B",
          lightgray: "#243E4E",
          gray: "#6B7B8D",
          darkgray: "#E8ECEF",
          dark: "#F7F7F5",
          secondary: "#2AB3A0",
          tertiary: "#84a59d",
          highlight: "rgba(42, 179, 160, 0.15)",
          textHighlight: "#2AB3A044",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
