<?php
// Timber Global setting
class TimberH extends TimberSite {

  function __construct(){
    add_filter('timber_context', array($this, 'add_to_context') );
    add_filter('get_twig', array($this, 'add_to_twig') );
    parent::__construct();
  }

  /*
    Global Context
  */
  function add_to_context($context) {
    $context['menu'] = new TimberMenu();
    $context['site'] = $this;
    $context['home_url'] = home_url();

    // $context['options'] = get_fields('options');

    $root = get_template_directory_uri();
    $context['images'] = $root.'/assets/images';
    $context['img'] = $context['images']; // alias
    $context['css'] = $root.'/assets/css';
    $context['js'] = $root.'/assets/js';
    $context['files'] = $root.'/assets/files';

    return $context;
  }

  /*
    Extension for Twig
  */
  function add_to_twig($twig) {
    $twig->addExtension(new Twig_Extension_StringLoader() );

    // Parse Markdown
    $twig->addFilter('markdown', new Twig_Filter_Function(function($text) {
      $pd = new Parsedown();
      return $pd->text($text);
    }) );

    return $twig;
  }
}

new TimberH();
