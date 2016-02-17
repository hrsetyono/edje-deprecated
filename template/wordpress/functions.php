<?php
// Requirement : WP 4.1 and PHP 5.3
include "code/timber.php";

// If Edje WP or Timber not installed, ignore all
if (!class_exists("H") || !class_exists("Timber") ) {
  return;
}

// THEME SUPPORT
add_action("after_setup_theme", "h_theme_support");
function h_theme_support() {
  add_theme_support("post-thumbnails");
  add_theme_support("menus");
  add_theme_support("html5");
}

// CUSTOM POST TYPE
// FORMAT : H::register_post_type(name, <args>)
// Read more at github.com/hrsetyono/edje-wp#custom-post-type
add_action("init", "h_post_type");
function h_post_type() {
  
}
