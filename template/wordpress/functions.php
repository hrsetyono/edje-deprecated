<?php include "code/main.php";

/* -------------------------
Req: WP 4.1 and PHP 5.3
------------------------- */

// THEME SUPPORT
add_theme_support("post-thumbnails");
add_theme_support("menus");

// CUSTOM POST TYPE
// FORMAT  : add_post_type(name, <args>)
// check edge.thesyne.com/wordpress for detail

// Remove Unnecessary ADMIN SIDEBAR, need Timber plugin
function get_removed_list() {
  return array("Comments", "Media");
}