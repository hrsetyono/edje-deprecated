var fs = require("fs-extra"),
    path = require("path"),
    inquirer = require("inquirer"), // prompt

    logger = require("./logger.js"),
    STR = require("./str.js"), // message list

    https = require("https"), // download wordpress
    url = require("url"), // download wordpress
    progress = require("progress"), // download progress
    adm_zip = require("adm-zip"); // unzip wp download

/* --------------------
  Template Generator
-------------------- */

var _template = {
  APP_DIR: path.dirname(require.main.filename),
  MENU: ["html", "email", "wordpress"],

  init: function(type) {
    if(type) {
      this._run(type);
    }
    // ask menu if type not given
    else {
      this._menu();
    }
  },

  // execute based on type, but only if it's safe
  _run: function(type) {
    _safety.check(function(isSafe) {
      if(isSafe) {

        switch(type) {
          case "wordpress":
            logger.info(STR.template.download_wp + "\n");
            _wordpress.create();
            break;

          default:
            if(this.MENU.indexOf(type) >= 0) {
              this._create(type);  
            } else {
              logger.error(STR.template.invalid);
            }
        } // endswitch
      }
      else {
        logger.warn(STR.template.cancelled);
      } // endif
    });
  },

  // ask for which template to output
  _menu: function() {
    var questions = [{
      type: "rawlist",
      name: "type",
      message: STR.template.ask_menu,
      choices: this.MENU,
    }];

    inquirer.prompt(questions, function(answers) {
      console.log(""); // line break
      this._run(answers.type);
    }.bind(this) );
  },

  // copy template to current directory
  _create: function(type) {
    logger.create(type + " template");

    var basePath = this.APP_DIR + "/template/base";
    var templatePath = this.APP_DIR + "/template/" + type;

    fs.copy(basePath, process.cwd(), function(err) {
      if(err) { return logger.error(err); }
    });

    fs.copy(templatePath, process.cwd(), function(err) {
      if(err) { return logger.error(err); }
    });

    logger.success(STR.template.success);
  },
};

/* ------------------
  WordPress module
------------------ */

var _wordpress = {
  APP_DIR: path.dirname(require.main.filename),
  FILE_URL: "https://wordpress.org/latest.zip",
  SRC_NAME: "wordpress.zip", // local wp file
  SRC_PATH: "/template/wordpress-src",

  // get the zip file from local source
  create: function() {
    var wpDir = this.APP_DIR + this.SRC_PATH;
    fs.copySync(wpDir, process.cwd() );

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
      var bar = new progress(STR.template.download_bar, {
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

  /*
    unzip, re-arrange, and add theme files
  */
  _setup: function() {
    this._promptName(function(themeName) {
      logger.info("Setting up " + themeName + " directory...");
      var file = process.cwd() + "/" + this.SRC_NAME;
      this._unzip(file, process.cwd() );
      this._setTheme(themeName);
    });
  },

  /*
    unzip the files
    @param file (string) path to the zip file
           toDir (string) directory to put the extracted files
  */
  _unzip: function(file, toDir) {
    var zip = new adm_zip(file);
    zip.extractAllTo(toDir, true);
    fs.removeSync(file);
  },

  /*
    arrange the directory and add theme files.
    @param name (string) theme's directory name (preferrably no-space, lower case)
  */
  _setTheme: function(name) {
    // all files contained in /wordpress dir, so we move them out.
    var srcFrom = process.cwd() + "/wordpress/";
    var srcTo = process.cwd();
    fs.move(srcFrom, srcTo, function(err) {
      if(err) { return logger.error(err); }

      // add theme
      var themeFrom = _wordpress.APP_DIR + "/template/wordpress";
      var themeTo = process.cwd() + "/wp-content/themes/" + name;

      fs.copy(themeFrom, themeTo, function(err) {
        if(err) { return logger.error(err); }

        logger.success(STR.template.success_wp);
      });
    });
  },

  // Ask the theme's directory name
  _promptName: function(callback) {
    var questions = [{
      type: "type",
      name: "name",
      default: "custom-theme",
      message: STR.template.prompt_wp,
    }];

    inquirer.prompt(questions, function(answers) {
      callback.bind(_wordpress)(answers.name);
    });
  },
};

// Check safety of the directory, only proceed if empty or user allow
var _safety = {
  /*
    Check whether dir is safe (empty or answer "Y")
    @param onSafe (function) - after ensuring its safe
      ~ (boolean) safe or not
  */
  check: function(onSafe) {
    var dirTarget = process.cwd();
    var files = fs.readdirSync(dirTarget);

    // if not empty
    if(files.length > 0) {
      this._prompt(onSafe);
    }
    // if empty
    else {
      onSafe.bind(_template)(true);
    }
  },

  _prompt: function(onSafe) {
    var questions = [{
      type: "confirm",
      name: "proceed",
      default: false,
      message: STR.template.ask_confirm
    }];

    inquirer.prompt(questions, function(answers) {
      onSafe.bind(_template)(answers.proceed);
    });
  },
};

module.exports = _template;