#! /usr/bin/env node

var args = process.argv.slice(2);

var logger = require("./script/logger.js"),
    template = require("./script/template.js"),
    plugin = require("./script/plugin.js"),
    str = require("./script/string.js");

// command center
var commander = {
  init: function() {
    switch(args[0]) {
      case "template":
      case "create":
        template.init(args[1]);
        break;

      case "plugin":
        plugin.init(args[1]);
        break;

      default:
        logger.warn(str.BASE.invalid_command);
    }
  },
};

commander.init();
