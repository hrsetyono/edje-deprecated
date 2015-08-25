<?php include "code/main.php";

/* -------------------------
Req: WP 4.1 and PHP 5.3
------------------------- */

// THEME SUPPORT
add_theme_support("post-thumbnails");
add_theme_support("menus");

// CUSTOM POST TYPE
// FORMAT  : add_post_type(name, <args>)
// check github.com/hrsetyono/edje#wordpress for detail

// Remove unnecessary Admin Sidebar
function h_remove_menu() {
  return array("Comments", "Media");
}

// Add new Admin Sidebar, you can put it "above" or "below" certain menu
function h_add_menu() {
  return array(
    /*
    "Home" => array(
      "slug" => "post.php?post=1",
      "icon" => "admin-home",
      "above" => "Posts"
    )
    */
  );
}