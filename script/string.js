// String resources

var string = {
  BASE: {
    invalid_command: 'Command not found. Try `edje create`.',
  },

  // TEMPLATE
  TEMPLATE : {
    // string log
    success: 'Below are available commands:',
    command_all:
        '\n    npm install : download dependencies.' +
        '\n    npm run sass: compile Sass.',
    command_email:
        '\n    grunt build : inline the CSS' +
        '\n    grunt send  : inline and send test email, configure it in Gruntfile first',
    invalid: 'Invalid template name. Type `edje create` to see available one.',
    cancelled: 'Template creation cancelled',

    // string prompt
    ask_menu: 'What do you want to create?',
    ask_confirm: 'File with the same name will be replaced. Proceed?',
  },

  WP: {
    start: 'Preparing WordPress installation...',
    ask_name: 'Enter your theme\'s directory name:',
    download_bar: 'downloading [:bar] :percent :etas',
    setup_theme: 'Setting up theme directory...',
    setup_plugin: 'Downloading default plugins...',
    setup_woo_plugin: 'Downloading WooCommerce plugins...',
    success: 'Go to `wp-content/themes/{name}` to run these commands:',
  },

  PLUGIN: {
    ask_menu: 'What plugin do you want to add?',
    success: 'JS needs <script> tag and Sass must be @import-ed (in framework.scss).',
    not_edje: 'Sorry, this command only works on Edje project.',
    not_found: 'Plugin not found, type `edje plugin` to see available list.'

  },
};

module.exports = string;
