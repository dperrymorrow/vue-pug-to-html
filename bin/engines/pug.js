"use strict";

const pug = require("pug");
const fs = require("fs");

module.exports = function(filePath) {
  const contents = fs.readFileSync(filePath, "utf-8");

  return {
    name: "pug",

    convertTemplate() {
      console.log(filePath, contents);
      return pug.render(contents, {
        doctype: "html",
        pretty: true,
      });
    },

    saveToFile(html) {
      fs.writeFileSync(filePath.replace(".pug", ".html"), html);
    },
  };
};
