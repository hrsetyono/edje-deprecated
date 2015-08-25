<?php
// If Timber not installed or not activated
if (!class_exists("Timber") ) {
  echo "Timber not activated. <a href='" . admin_url("plugin-install.php?tab=search&type=term&s=Timber+Library&plugin-search-input=Search+Plugins") . "'>Install</a> or <a href='" . admin_url("plugins.php#timber") . "'>Activate it</a> via Admin Panel</a>";
  return;
}

$context = Timber::get_context();
$context["posts"] = Timber::get_posts();
$context["pagination"] = Timber::get_pagination();

Timber::render("index.twig", $context);