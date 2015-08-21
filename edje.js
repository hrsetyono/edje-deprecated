#! /usr/bin/env node

var args = process.argv.slice(2);

var logger = require("./cli/logger.js"),
    template = require("./cli/template.js");
    plugin = require("./cli/plugin.js");

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
        logger.warn("Invalid commando");
    }
  },
};

commander.init();