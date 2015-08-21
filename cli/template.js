var fs = require("fs-extra"),
    inquirer = require("inquirer"), // prompt

    logger = require("./logger.js"), // pretty logging
    str = require("./string.js"), // constant string
    printf = require("./printf.js"),

    https = require("https"), // download wordpress
    url = require("url"), // download wordpress
    progress = require("progress"), // download progress
    adm_zip = require("adm-zip"); // unzip wp download

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
            break;

          default:
            if(this.MENU.indexOf(type) >= 0) {
              this._createBase();
              this._create(type);
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

    logger.success(str.TEMPLATE.success);
  },
};

/* ------------------
  WordPress module
------------------ */

var wordpress = {
  FILE_URL: "https://wordpress.org/latest.zip",
  SRC_NAME: "wordpress.zip", // local wp file

  BASE_DIR: PATH.src + "/template/wordpress-src-test",
  ZIP_SRC: PATH.current + "/wordpress.zip",

  THEME_SRC: PATH.src + "/template/wordpress",
  THEME_DEST: PATH.current + "/wp-content/themes/{name}",

  // get the zip file from local source
  create: function() {
    fs.copySync(this.BASE_DIR, PATH.current);

    // TODO: when there is existing wordpress.zip file, it takes time to replace it. So setup will return "file not found" error
    this._setup();
  },

  // download latest wp zip file from online
  download: function() {
    var options = {
      host: url.parse(this.FILE_URL).host,
      port: 80,
      path: url.parse(this.FILE_URL).pathname,
    };

    var file = fs.createWriteStream(this.SRC_NAME);
    var request = https.get(this.FILE_URL);

    // start downloading
    request.on("response", function(res) {
      res.pipe(file);

      var len = parseInt(res.headers["content-length"], 10);

      // create progress bar
      console.log("");
      var bar = new progress(str.WP.download_bar, {
        complete: "=",
        incomplete: " ",
        width: 20,
        total: len,
      });

      // update progress bar
      res.on("data", function(chunk) {
        bar.tick(chunk.length);
      });
    });

    request.end();

    this._setup();
  },

  // Arrange the directory and add theme
  _setup: function() {
    this._prompt(function(name) {
      logger.info(str.WP.setup_theme);

      this._unzip(this.ZIP_SRC, PATH.current);
      this._setTheme(name);
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
    Arrange the directory and add theme files.
    @param name (string) theme's directory name (preferrably no-space, lower case)
  */
  _setTheme: function(name) {
    // all files contained in /wordpress dir, so we move them out.
    var srcFrom = PATH.current + "/wordpress/";
    var srcTo = PATH.current;

    fs.move(srcFrom, srcTo, function(err) {
      if(err) { return logger.error(err); }

      // add theme
      var themeFrom = this.THEME_SRC;
      var themeTo = printf(this.THEME_DEST, {
        name: name
      });

      fs.copy(themeFrom, themeTo, function(err) {
        if(err) { return logger.error(err); }

        logger.success(str.WP.success);
      });
    }.bind(this) );
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