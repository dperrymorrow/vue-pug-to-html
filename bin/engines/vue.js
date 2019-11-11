"use strict";

const pug = require("pug");
const fs = require("fs");

module.exports = function(filePath) {
  const contents = fs.readFileSync(filePath, "utf-8");
  let html = "";

  function findTemplateRaw() {
    return contents.split(`<template lang="pug">`)[1].split("</template>")[0];
  }

  function findTemplate() {
    let lines = findTemplateRaw()
      .split("\n")
      .filter(row => row !== "");

    if (lines[0].startsWith("  ")) lines = lines.map(line => line.replace("  ", ""));
    return lines.join("\n");
  }

  return {
    name: "vue",

    hasVueTemplate() {
      return contents.includes(`<template lang="pug">`);
    },

    convertTemplate() {
      html = pug
        .render(findTemplate(), { pretty: true })
        .replace(new RegExp('v-else="v-else"', `g`), "v-else")
        .replace(new RegExp("&gt;", `g`), ">")
        .replace(new RegExp("&amp;", `g`), "&")
        .replace(new RegExp("&quot;", `g`), "'");
      return html;
    },

    saveToFile() {
      const formatted = html
        .split("\n")
        .map(line => `  ${line}`)
        .join("\n");

      const data = contents
        .replace(findTemplateRaw(), `${formatted}\n`)
        .replace(`<template lang="pug">`, "<template>");
      fs.writeFileSync(filePath, data);
    },
  };
};
