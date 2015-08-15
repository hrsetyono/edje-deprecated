// Main export module

module.exports = {
  // enable sass import
  includePaths: function() {
    var sassPath = __dirname + "\\sass";
    return [sassPath];
  }
}