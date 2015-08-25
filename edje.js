#! /usr/bin/env node

var args = process.argv.slice(2);

var logger = require("./bin/logger.js"),
    template = require("./bin/template.js"),
    plugin = require("./bin/plugin.js"),
    str = require("./bin/string.js");

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