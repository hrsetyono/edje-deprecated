<?php // Generic Utility

/*
  ELLIPSIZE
  - Adding "..." at the end of the string.
  - Default is 160 characters
*/

function ellipsize($text, $char_number = "160", $etc = "...") {
  $text = html_entity_decode($text, ENT_QUOTES);
  if (strlen($text) > $char_number) {
    $text = substr($text, 0, $char_number);
    $text = substr($text,0,strrpos($text," "));

    $punctuation = ".!?:;,-"; // punctuation you want removed

    $text = (strspn(strrev($text),  $punctuation) != 0)
            ?
            substr($text, 0, -strspn(strrev($text),  $punctuation))
            :
            $text;

    $text = $text.$etc;
  }
  $text = htmlentities($text, ENT_QUOTES);
  return $text;
}

// Transform string into parameter-safe
function h_paramize($str) {
  return strtolower( str_replace(" ", "_", $str) );
}