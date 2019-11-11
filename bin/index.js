#!/usr/bin/env node

"use strict";

const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const VueEngine = require("./engines/vue");
const PugEngine = require("./engines/pug");

function _processFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  const engine = filePath.endsWith(".vue") ? VueEngine(filePath) : PugEngine(filePath);

  if (engine.name === "vue" && !engine.hasVueTemplate()) {
    console.log(chalk.yellow(`${fileName} does not have a pug template`));
    return;
  }

  engine.convertTemplate();
  console.log(chalk.green(`${fileName} converted!!`));
  engine.saveToFile();
}

fs.readdirSync(process.cwd())
  .filter(file => file.endsWith(".vue"))
  .forEach(_processFile);
