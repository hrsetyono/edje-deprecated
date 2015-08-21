// String resources

var string = {
  // TEMPLATE
  TEMPLATE : {
    // string log
    success: "run 'compass watch' to generate CSS",
    invalid: "Invalid template name. Use `edje create` to see available one.",
    cancelled: "Template creation cancelled",

    // string prompt
    ask_menu: "What do you want to create?",
    ask_confirm: "File with the same name will be replaced. Proceed?",
  },

  WP: {
    start: "Preparing WordPress installation...",
    ask_name: "Enter your theme's directory name:",
    download_bar: "downloading [:bar] :percent :etas",
    setup_theme: "Setting up theme directory...",
    success: "Go to `wp-content/themes/` to start working.",
  },

  PLUGIN: {
    ask_menu: "What plugin do you want to add?",
    success: "Now setup your project. Sass needs to be @import-ed and add new <script> tag for JS.",
    not_edje: "Sorry, this command only works on Edje project.",
    not_found: "Plugin not found, type `edje plugin` to see available list."
        
  },
};

module.exports = string;

