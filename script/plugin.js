// Additional scripts for a project, such as slider, datepicker, etc.

var path = require("path"),
    fs = require("fs-extra"),
    inquirer = require("inquirer"),

    logger = require("./logger.js"),
    str = require("./string.js"),
    printf = require("./printf.js");

// constant
var PATH = {
  src: require("path").dirname(require.main.filename),
  current: process.cwd(),
};

var plugin = {
  MENU: ["slick", "fancybox"],
  TYPE_DIR: PATH.src + "/plugin/{type}",
  
  SASS_DEST: "/assets/sass",
  JS_DEST: "/assets/js/vendor",

  init: function(type) {
    // if the project depends on Edje
    if(this._dependsOnEdje() ) {
      // if type is given, run immediately
      if(type) {
        this._create(type); }
      // else, ask what to create
      else {
        this._menu(); }

    } else {
      logger.error(str.PLUGIN.not_edje);
    }
  },

  // Copy the plugin files to respective directory
  _create: function(type) {
    var srcDir = printf(this.TYPE_DIR, {type: type} );
    // read and loop the plugin files
    fs.readdir(srcDir, function(err, files) {
      if(err) { logger.error(err); }

      if(!files) {
        logger.error(str.PLUGIN.not_found);
        return false;
      }

      for(var i = 0, len = files.length; i < len; i++) {
        // look for the right destination dir
        var dest = null;
        switch(path.extname(files[i]) ) {
          case ".scss":
            dest = this.SASS_DEST;
            break;

          case ".js":
          default:
            dest = this.JS_DEST;
            break;
        }

        // copy files
        var filePath = srcDir + "/" + files[i];
        var fullDest = PATH.current + dest + "/" + files[i]; 
        fs.copySync(filePath, fullDest);
        logger.create(dest + "/" + files[i] );
      } // endfor

      logger.success(str.PLUGIN.success);
    }.bind(this) );
  },

  // check if the project depends on Edje
  _dependsOnEdje: function() {
    try {
      var pack = require(PATH.current + "/package.json");
      return pack.dependencies.edje ? true : false;
    } catch(e) {
      return false
    }
  },

  _menu: function() {
    var questions = [{
      type: "rawlist",
      name: "type",
      message: str.PLUGIN.ask_menu,
      choices: this.MENU,
    }];

    inquirer.prompt(questions, function(answers) {
      this._create(answers.type);
    }.bind(this) );
  },
};

// Check safety of the directory, only proceed if empty or user allow
var safety = {
  /*
    Check whether dir is safe to drop the template files
    @param callback (function) - run after checking the condition
      ~ (boolean) safe or not
  */
  check: function(callback) {
    var files = fs.readdirSync(PATH.current);

    // if not empty, ask for replace confirmation
    if(files.length > 0) {

      var questions = [{
        type: "confirm",
        name: "proceed",
        default: false,
        message: str.TEMPLATE.ask_confirm
      }];

      inquirer.prompt(questions, function(answers) {
        // set the param to what user say
        callback.bind(template)(answers.proceed);
      });
    }
    // if empty, set the param to true
    else {
      callback.bind(template)(true);
    }
  },
};

module.exports = plugin;