var fs = require("fs-extra"),
    inquirer = require("inquirer"), // prompt
    adm_zip = require("adm-zip"), // unzip wp

    logger = require("./logger.js"), // pretty logging
    str = require("./string.js"), // constant string
    printf = require("./printf.js");

// constant
var PATH = {
  src: require("path").dirname(require.main.filename),
  current: process.cwd(),
};

/* --------------------
  Template Generator
-------------------- */

var template = {
  MENU: ["html", "email", "wordpress"],
  BASE_SRC: PATH.src + "/template/base",
  TYPE_SRC: PATH.src + "/template/{type}",

  init: function(type) {
    if(type) {
      this._run(type);
    } else { // ask menu if type not given
      this._menu();
    }
  },

  // execute based on type, but only if it's safe
  _run: function(type) {
    safety.check(function(isSafe) {
      if(isSafe) {
        switch(type) {
          case "wordpress":
            logger.info(str.WP.start + "\n");
            wordpress.create();
            break;

          case "email":
            this._create(type);
            logger.success(
              str.TEMPLATE.success +
              str.TEMPLATE.command_all +
              str.TEMPLATE.command_email
            );
            break;

          default:
            if(this.MENU.indexOf(type) >= 0) {
              this._createBase();
              this._create(type);
              logger.success(
                str.TEMPLATE.success +
                str.TEMPLATE.command_all
              );
            } else {
              logger.error(str.TEMPLATE.invalid);
            }
        } // endswitch
      }
      else {
        logger.warn(str.TEMPLATE.cancelled);
      } // endif
    });
  },

  // ask for which template to output
  _menu: function() {
    var questions = [{
      type: "rawlist",
      name: "type",
      message: str.TEMPLATE.ask_menu,
      choices: this.MENU,
    }];

    inquirer.prompt(questions, function(answers) {
      console.log(""); // line break
      this._run(answers.type);
    }.bind(this) );
  },

  // copy the base file like assets, readme
  _createBase: function() {
    var basePath = this.BASE_SRC;

    fs.copy(basePath, PATH.current, function(err) {
      if(err) { return logger.error(err); }
    });
  },

  // copy the specific template
  _create: function(type) {
    logger.create(type + " template");

    var templatePath = printf(this.TYPE_SRC, {type: type});

    fs.copy(templatePath, PATH.current, function(err) {
      if(err) { return logger.error(err); }
    });
  },
};

/* ------------------
  WordPress module
------------------ */

var wordpress = {
  FILE_URL: "https://wordpress.org/latest.zip",
  SRC_NAME: "wordpress.zip", // local wp file

  BASE_DIR: PATH.src + "/template/wordpress-src",
  ZIP_SRC: PATH.current + "/wordpress.zip",

  BASE_SRC: PATH.src + "/template/base",
  THEME_SRC: PATH.src + "/template/wordpress",
  THEME_DEST: PATH.current + "/wp-content/themes/{name}",

  // get the zip file from local source
  create: function() {
    fs.copySync(this.BASE_DIR, PATH.current);

    // TODO: when there is existing wordpress.zip file, it takes time to replace it. So setup will return "file not found" error
    this._setup();
  },

  // Arrange the directory and add theme
  _setup: function() {
    this._prompt(function(name) {
      logger.info(str.WP.setup_theme);

      this._unzip(this.ZIP_SRC, PATH.current);
      this._theme(name);
    });
  },

  /*
    Unzips the file, then deletes it
    @param file (string) path to the zip file
           to (string) directory to put the extracted files
  */
  _unzip: function(file, to) {
    var zip = new adm_zip(file);
    zip.extractAllTo(to, true);
    
    fs.remove(file, function() {});
  },

  /*
    Add base and theme files.
    @param name (string) theme's directory name (preferrably no-space, lower case)
  */
  _theme: function(name) {
    var themeDest = printf(this.THEME_DEST, {
      name: name
    });

    // base files
    fs.copySync(this.BASE_SRC, themeDest);
    // theme files
    fs.copy(this.THEME_SRC, themeDest, function(err) {
      if(err) { return logger.error(err); }

      logger.success(
        printf(str.WP.success, {name: name}) +
        str.TEMPLATE.command_all
      );
    });
  },

  // Ask the theme's directory name
  _prompt: function(callback) {
    var questions = [{
      type: "type",
      name: "name",
      default: "custom-theme",
      message: str.WP.ask_name,
    }];

    inquirer.prompt(questions, function(answers) {
      callback.bind(wordpress)(answers.name);
    });
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

module.exports = template;