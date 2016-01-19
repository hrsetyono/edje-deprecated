<?php
include "util.php";
include "inflector.php";
include "cpt.php";

// If Timber not installed, ignore all the code below this
if (!class_exists("Timber") ) {
  return;
}

class TimberEdge extends TimberSite {

  function __construct(){
    add_filter("timber_context", array($this, "add_to_context") );
    add_filter("get_twig", array($this, "add_to_twig") );
    parent::__construct();
  }

  function add_to_context($context) {
    $context["menu"] = new TimberMenu();
    $context["site"] = $this;
    $context["home_url"] = home_url();

    $root = get_template_directory_uri();
    $context["images"] = $root."/assets/images";
    $context["img"] = $context["images"]; // alias
    $context["css"] = $root."/assets/css";
    $context["js"] = $root."/assets/js";
    $context["files"] = $root."/assets/files";
    
    return $context;
  }

  function add_to_twig($twig) {
    return $twig;
  }
}

new TimberEdge();

/* -------------
  ADMIN MENU
------------- */

// Remove admin menu by using the Display text (case sensitive)
add_action("admin_menu", function() {
  global $menu;
  end($menu);

  $args = h_remove_menu();

  foreach($menu as $key => $m) {
    if($m[0]) {
      $i = explode(" <", $m[0]);

      if(in_array($i[0], $args) ) {
        unset($menu[$key]);
      }
    }
  }
});

// Add new Admin menu
add_action("admin_menu", function() {
  global $menu;
  end($menu);

  $args = h_add_menu();

  foreach($args as $key => $m) {
    $pos = null;
    $base = isset($m["above"]) ? $m["above"] : $m["below"];
    $increment = isset($m["above"]) ? -1 : 1;

    // if base is defined, calculate position
    if(defined($base) ) {
      $base_pos = h_array_search($base, $menu);
      $pos = $base_pos + $increment;

      // if the position already filled
      while($menu[$pos]) {
        $pos += $increment;
      }
    }

    add_menu_page($key,
      $key,
      "manage_options",
      $m["slug"],
      null,
      $m["icon"] ? "dashicons-".$m["icon"] : null,
      $pos
    );
  }
});

// remove wp meta tag
remove_action("wp_head", "wp_generator") ;
remove_action("wp_head", "wlwmanifest_link") ;
remove_action("wp_head", "rsd_link") ;

// remove emoji
remove_action("wp_head", "print_emoji_detection_script", 7 );
remove_action("admin_print_scripts", "print_emoji_detection_script");

// remove extra rss
remove_action("wp_head", "feed_links", 2 );
remove_action("wp_head", "feed_links_extra", 3 );

// remove thank you message in admin
add_filter("admin_footer_text", "__return_empty_string", 11);
add_filter("update_footer", "__return_empty_string", 11);

// change login error
add_filter("login_errors", function() {
  return "Sorry, your username or password is wrong";
});

// prevent url guessing
add_filter("redirect_canonical", function($url) {
  if (is_404()) {
    return false;
  }
  return $url;
});