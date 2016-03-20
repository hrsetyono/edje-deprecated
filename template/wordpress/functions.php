<?php // Requirement : WP 4.1 and PHP 5.3

// If Edje WP or Timber not installed, ignore all
if (!class_exists('H') || !class_exists('Timber')) {
  // show notice in admin
  if(is_admin() && current_user_can('install_plugins') ) {
    $text = 'TIMBER or EDJE WP is not activated. Please <a href="' . admin_url('plugins.php#timber') . '">visit here</a> to active it.';
    add_action('admin_notices', function() use ($text) {
      echo '<div class="notice notice-error"><p>' . $text . '</p></div>';
    });
  }
  return;
}

include 'code/timber.php';

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
