"use strict";

const jade = require("jade");
const pug = require("pug");
const fs = require("fs");

const TEMPLATE_LANG = {
  PUG: `PUG`,
  JADE: `JADE`,
};

const TEMPLATE_PREFIX = {
  PUG: `<template lang="pug">`,
  JADE: `<template lang="jade">`,
};

module.exports = function(filePath) {
  const contents = fs.readFileSync(filePath, "utf-8");
  const html = "";

  function getVueTemplateLang() {
    if (contents.includes(TEMPLATE_PREFIX.PUG)) {
      return TEMPLATE_LANG.PUG;
    } else if (contents.includes(TEMPLATE_PREFIX.JADE)) {
      return TEMPLATE_LANG.JADE;
    }
  }

  function findTemplateRaw(templateLang) {
    return contents.split(TEMPLATE_PREFIX[templateLang])[1].split("</template>")[0];
  }

  function findTemplate() {
    const templateLang = getVueTemplateLang();
    if (!templateLang) {
      throw new Error("Not found supported template lang");
    }
    let lines = findTemplateRaw(templateLang)
      .split("\n")
      .filter(row => row !== "");

    if (lines[0].startsWith("  ")) {
      lines = lines.map(line => line.replace("  ", ""));
    }
    return lines.join("\n");
  }

  return {
    name: "vue",

    hasSupportedVueTemplate() {
      return getVueTemplateLang() !== undefined;
    },

    convertTemplate() {
      const templateLang = getVueTemplateLang();
      if (templateLang === TEMPLATE_LANG.PUG) {
        return pug
          .render(findTemplate(), {
            doctype: "html",
            pretty: true,
          })
          .replace(new RegExp("&amp;", `g`), "&");
      } else if (templateLang === TEMPLATE_LANG.JADE) {
        return jade
          .render(findTemplate(), {
            doctype: "html",
            pretty: true,
          })
          .replace(new RegExp("&amp;", `g`), "&");
      }
      return findTemplate();
    },

    saveToFile() {
      const formatted = html
        .split("\n")
        .map(line => `  ${line}`)
        .join("\n");

      const templateLang = getVueTemplateLang();
      const data = contents
        .replace(findTemplateRaw(templateLang), `${formatted}\n`)
        .replace(TEMPLATE_PREFIX[templateLang], "<template>");
      fs.writeFileSync(filePath, data);
    },
  };
};
