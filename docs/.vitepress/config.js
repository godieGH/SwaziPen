import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import enSideBar from "./enSidBar.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    title: "SwaziLang",
    description:
        "Learn how to code with SwaziLang, and build amazing projects.",

    locales: {
        root: {
            label: "English",
            lang: "en",
            link: "/en/",
            themeConfig: {
                nav: [
                    { text: "Home", link: "/en/" },
                    { text: "Get Started", link: "/en/getting-started" },
                    { text: "Swazi Advanced", link: "/en/swazi/advanced" },
                    {
                        text: "Guide & Resources",
                        items: [
                            { text: "Keywords", link: "" },
                            { text: "Reference", link: "" },
                            { text: "Examples & Recipes", link: "" }
                        ]
                    }
                ],
                sidebar: enSideBar
            }
        },
        sw: {
            label: "Swahili",
            lang: "sw",
            link: "/sw/",
            themeConfig: {
                nav: [],
                sidebar: []
            }
        }
    },

    themeConfig: {
        socialLinks: [
            { icon: "github", link: "https://github.com/godieGH/SwaziPen" }
        ]
    },

    markdown: {
        languages: [
            JSON.parse(
                fs.readFileSync(
                    path.resolve(__dirname, "swazi.tmLanguage.json"),
                    "utf-8"
                )
            )
        ]
    }
});
