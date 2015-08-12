#! /usr/bin/env node

var args = process.argv.slice(2);

var logger = require("./cli/logger.js"),
    template = require("./cli/template.js");

// command center
var commander = {
  init: function() {
    switch(args[0]) {
      case "create":
        template.init(args[1]);
        break;

      default:
        console.log("asd");
        logger.warn("Invalid commando");
    }
  },
};

commander.init();