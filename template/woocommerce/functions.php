<?php // Requirement : WP 4.1 and PHP 5.3

require_once 'code/timber.php';
require_once 'code/woo.php';

if(!has_required_plugins() ) { return false; }

// THEME SUPPORT
add_action('after_setup_theme', 'h_theme_support');
function h_theme_support() {
  add_theme_support('post-thumbnails');
  add_theme_support('menus');
  add_theme_support('html5');

  add_theme_support('woocommerce');
}

// CUSTOM POST TYPE
// FORMAT : H::register_post_type(name, <args>)
// Read more at https://github.com/hrsetyono/edje-wp/wiki/Custom-Post-Type
add_action('init', 'h_post_type');
function h_post_type() {
  // put your code here
}

// ACF OPTION page
// if( function_exists('acf_add_options_page') ) {
//   acf_add_options_page();
// }
