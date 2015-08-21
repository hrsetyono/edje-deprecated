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
    if(this._isEdje() ) {
      // if type is given, run immediately
      if(type) { this._run(type); }
      // else, ask what to create
      else { this._menu(); }

    } else {
      logger.error(str.PLUGIN.not_edje);
    }
  },

  // copy the plugin files
  _run: function(type) {
    var srcDir = printf(this.TYPE_DIR, {type: type} );
    // read and loop the plugin files
    fs.readdir(srcDir, function(err, files) {
      if(!files) {
        logger.error(str.PLUGIN.not_found);
        return false;
      }

      // copy the files one by one to respective dir
      for(var i = 0, len = files.length; i < len; i++) {

        // find the destination path
        var dest = null;
        switch(path.extname(files[i]) ) {
          case ".scss":
            dest = this.SASS_DEST;
            break;

          case ".js":
          default:
            dest = this.JS_DEST;
            break;
        } // endswitch

        // copy files
        var filePath = srcDir + "/" + files[i];
        var fullDest = PATH.current + dest + "/" + files[i]; 
        
        fs.copySync(filePath, fullDest);
        logger.create(dest + "/" + files[i] );
      } // endfor

      console.log("");
      logger.success(str.PLUGIN.success);
    }.bind(this) );
  },

  // check if the project depends on Edje
  _isEdje: function() {
    var pack = require(PATH.current + "/package.json");
    return pack.dependencies.edje ? true : false;
  },

  _menu: function() {
    var questions = [{
      type: "rawlist",
      name: "type",
      message: str.PLUGIN.ask_menu,
      choices: this.MENU,
    }];

    inquirer.prompt(questions, function(answers) {
      console.log(""); // line break
      this._run(answers.type);
    }.bind(this) );
  },
};

module.exports = plugin;