<?php

function add_post_type($name, $args = array() ) {
  $cpt = new CPT($name, $args);
  $cpt->init();
}

// CUSTOM Post Type
class CPT {
  private $name;
  private $args;

  // for sidebar menu position
  private $menu = array(
    "count" => 0,
    "BASE" => 30, // below "Comments"
    "STEP" => 5
  );

  public function __construct($name, $args) {
    $this->name = $name;
    $this->args = $args;
  }

  // Add the post type and all of it's perk based on the args
  public function init() {
    $post_args = $this->buildArgs($this->name, $this->args);

    // If taxonomy is given
    if(isset( $this->args["taxonomy"] ) ) {
      $this->add_taxonomy($this->args["taxonomy"], $this->name);
    }

    register_post_type(strtolower($this->name), $post_args);

    // if column ordering is given
    if(isset( $this->args["columns"] ) ) {
      $this->add_column($this->name, $this->args["columns"]);
    }
  }

  // Build the necessary arguments for CPT
  private function buildArgs($name, $args) {
    $plural = Inflector::pluralize($name);
    $singular = $name;

    $labels = array(
      "name" => $plural,
      "singular_name" => $singular,
      "all_items" => "All " . $plural,
      "add_new_item" => "Add New " . $singular,
      "edit_item" => "Edit " . $singular,
      "new_item" => "New " . $singular,
      "view_item" => "View " . $singular,
      "search_items" => "Search " . $plural,
      "not_found" => "No " . strtolower($plural) . " found",
      "not_found_in_trash" => "No " . strtolower($plural) . " found in Trash",
      "parent_item_colon" => "Parent " . $singular . ":",
    );

    // MENU (put it below Comments)
    $menu_position = $this->menu["BASE"] + ($this->menu["STEP"] * $this->menu["count"]);
    $this->menu["count"] += 1;

    // Build the post arguments
    $post_args = array(
      "public" => true,
      "labels" => $labels,
      "capability_type" => "post",
      "supports" => array(
        "title",
        "editor",
        "custom-fields",
        "thumbnail",
      ),
      "rewrite" => array(
        "with_front" => false
      ),
      "menu_position" => $menu_position
    );

    if($args["icon"]) {
      $post_args["menu_icon"] = "dashicons-".$args["icon"];
    }

    return $post_args;
  }

  // Create taxonomy and it's filter
  private function add_taxonomy($tax_name, $post_type) {
    $plural = Inflector::pluralize($tax_name);
    $singular = $tax_name;

    $labels = array(
      "name" => $plural,
      "singular_name" => $singular,
      "all_items" => "All " . $plural,
      "edit_item" => "Edit " . $singular,
      "view_item" => "View " . $singular,
      "update_item" => "Update " . $singular,
      "add_new_item" => "Add New " . $singular,
      "parent_item" => "Parent " . $singular,
      "search_items" => "Search " . $plural,
      "popular_items" => "Popular " . $plural,
      "add_or_remove_items" => "Add or remove " . strtolower($plural),
      "choose_from_most_used" => "Choose from the most used " . strtolower($plural),
      "not_found" => "No " . strtolower($plural) . " found"
    );

    $tax_args = array(
      "labels" => $labels,
      "show_ui" => true,
      "query_var" => true,
      "show_admin_column" => false,
      "hierarchical" => true,
    );
    register_taxonomy(strtolower($tax_name), strtolower($post_type), $tax_args);

    new CPT_Filter(array(strtolower($post_type) => array(strtolower($singular) ) ) );
  }

  // Add visible column in admin panel
  private function add_column($name, $raw_columns) {
    // create the WP filter name
    $name_slug = strtolower($name);
    $name_create = "manage_".$name_slug."_posts_columns"; // create column
    $name_fill = "manage_".$name_slug."_posts_custom_column"; // fill column
    $name_sortable = "manage_edit-".$name_slug."_sortable_columns"; // enable sorting

    // cleanup and build the dataset
    $columns = $this->clean_columns($raw_columns);
    $sortable_columns = $this->get_sortable_columns($raw_columns);

    // create the filter function
    $filter_create = function($defaults) use ($columns) {
      $cols = array();
      foreach($columns as $c) {
        $cols[$c] = ucwords( str_replace("_", " ", $c) );
      }
      $cols = array("cb" => $defaults["cb"]) + $cols;
      return $cols;
    };

    $filter_fill = function($column_name, $post_id) {
      switch($column_name) {
        case "cb":
        case "title":
        case "author":
        case "date":
          // do nothing, those are automatically filled
          break;
        case "thumbnail":
          $thumb = get_the_post_thumbnail($post_id, array(75, 75) );
          echo $thumb;

        // if custom field
        default:
          global $post;
          
          $meta = get_field($column_name, $post_id);
          $terms = get_the_terms($post_id, $column_name);
      
      // is a term if no error and has been ticked
          $is_terms = !isset($terms->errors) && $terms;
          
          // if the column is a custom field
          if($meta) {
            echo $meta;
          }
          // if the column is a term
          elseif ($is_terms) {
            $out = array();

            // loop through each term, linking to the 'edit posts' page for the specific term
            foreach ($terms as $term) {
              $out[] = sprintf("<a href='%s'>%s</a>",
                esc_url( add_query_arg(
                  array("post_type" => $post->post_type, "type" => $term->slug), "edit.php")
                ),
                esc_html( sanitize_term_field(
                  "name", $term->name, $term->term_id, "type", "display")
                )
              );
            }

            // join the terms, separating with comma
            echo join(", ", $out);
          }
          break;
      }
    };

    // enable sorting by clicking the table header
    $filter_sortable = function($defaults) use ($sortable_columns) {
      foreach($sortable_columns as $sc) {
        $defaults[$sc] = $sc;
      }
      return $defaults;
    };

    // additional wp args if sort by custom field
    $metakey_sortable = function($vars) use ($sortable_columns) {
      $is_orderby_meta = isset($vars["orderby"]) && in_array($vars["orderby"], $sortable_columns);

      if ($is_orderby_meta) {
        $vars = array_merge( $vars, array(
          "meta_key" => $vars["orderby"],
          "orderby" => "meta_value"
        ));
      }
      return $vars;
    };

    add_filter($name_create, $filter_create);
    add_action($name_fill, $filter_fill, 10, 2);
    add_filter($name_sortable, $filter_sortable);
    add_filter("request", $metakey_sortable);
  }

  // Cleanup the column args from annotation
  private function clean_columns($raw) {
    $columns = array_map(function($c) {
      return trim($c, "^");
    }, $raw);

    return $columns;
  }

  // Look for sortable column, annotated with ^
  private function get_sortable_columns($raw) {
    $columns = array_map(function($c) {
      if(strpos($c, "^") ) {
        return trim($c, "^");
      }
    }, $raw);

    return array_filter($columns);
  }
}

/*
  Add Taxonomy filter to a CPT
  @author Ohad Raz <admin@bainternet.info>
*/
class CPT_Filter {
  function __construct($cpt = array()) {
    $this->cpt = $cpt;
    add_action("restrict_manage_posts", array($this, "my_restrict_manage_posts") );
  }

  /*
    Add select dropdown per taxonomy
  */
  public function my_restrict_manage_posts() {
    // only display these taxonomy filters on desired custom post_type listings
    global $typenow;
    $types = array_keys($this->cpt);

    if (in_array($typenow, $types) ) {
      // create an array of taxonomy slugs you want to filter by - if you want to retrieve all taxonomies, could use get_taxonomies() to build the list
      $filters = $this->cpt[$typenow];

      foreach ($filters as $tax_slug) {
        // retrieve the taxonomy object
        $tax_obj = get_taxonomy($tax_slug);
        $tax_name = $tax_obj->labels->name;

        // output html for taxonomy dropdown filter
        echo "<select name='".strtolower($tax_slug)."' id='".strtolower($tax_slug)."' class='postform'>";
        echo "<option value=''>Show All $tax_name</option>";
        $this->generate_taxonomy_options($tax_slug,0,0,(isset($_GET[strtolower($tax_slug)])? $_GET[strtolower($tax_slug)] : null));
        echo "</select>";
      }
    }
  }
     
  /*
    Generate_taxonomy_options generate dropdown       
  */
  public function generate_taxonomy_options($tax_slug, $parent = "", $level = 0, $selected = null) {
    $args = array("show_empty" => 1);

    if(!is_null($parent) ) {
      $args = array("parent" => $parent);
    }
    $terms = get_terms($tax_slug, $args);
    $tab = "";
    
    for($i = 0; $i < $level; $i++) {
      $tab .= "--";
    }

    foreach ($terms as $term) {
      // output each select option line, check against the last $_GET to show the current option selected
      echo "<option value=". $term->slug, $selected == $term->slug ? " selected='selected'" : "", ">" . $tab . $term->name ." (" . $term->count .")</option>";
      $this->generate_taxonomy_options($tax_slug, $term->term_id, $level + 1, $selected);
    }
  }
}