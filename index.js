// Main export module

var path = require("path");

module.exports = {
  // enable sass import
  includePaths: function() {
    var edje = require.resolve("edje");
    return [path.dirname(edje)];
  }
}