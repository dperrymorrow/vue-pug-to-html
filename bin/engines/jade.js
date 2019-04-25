"use strict";

const jade = require("jade");
const fs = require("fs");

module.exports = function(filePath) {
  const contents = fs.readFileSync(filePath, "utf-8");
  let html = "";

  return {
    name: "jade",

    convertTemplate() {
      console.log(filePath, contents);
      html = jade.render(contents, {
        doctype: "html",
        pretty: true,
      });
      return html;
    },

    saveToFile() {
      fs.writeFileSync(filePath.replace(".jade", ".html"), html);
    },
  };
};
