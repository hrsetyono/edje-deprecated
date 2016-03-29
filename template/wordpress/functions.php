<?php // Requirement : WP 4.1 and PHP 5.3

include 'code/timber.php';

if(!has_required_plugins() ) { return false; }

// THEME SUPPORT
add_action('after_setup_theme', 'h_theme_support');
function h_theme_support() {
  add_theme_support('post-thumbnails');
  add_theme_support('menus');
  add_theme_support('html5');
}

// CUSTOM POST TYPE
// FORMAT : H::register_post_type(name, <args>)
// Read more at github.com/hrsetyono/edje-wp#custom-post-type
add_action('init', 'h_post_type');
function h_post_type() {

}

// ACF OPTION page
// if( function_exists('acf_add_options_page') ) {
//   acf_add_options_page();
// }
