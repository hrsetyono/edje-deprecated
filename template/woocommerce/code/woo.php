<?php
// Your custom WooCommerce code here

/*
  Set the global scope of Product
*/
function timber_set_product($post) {
  global $product;
  $product = isset($post->product) ? $post->product : get_product($post->ID);
}

new My_Product();
new My_Order();

/*
  Controller for Catalog, Single Product, and Shop page
*/
class My_Product {

  function __construct() {
    // Separate some actions from one call
    remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
    remove_action('woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15);
    remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);

    // Set the separated actions into its own call
    add_action('output_related_products', 'woocommerce_output_related_products');

    add_action('dura_template_single_buy', 'woocommerce_template_single_price', 5);
    add_action('dura_template_single_buy', 'woocommerce_template_single_add_to_cart', 10);

    // change "Add to Cart" text
    add_filter('woocommerce_product_single_add_to_cart_text', array($this, 'add_to_cart_text') );

    // change success message after adding to cart
    add_filter('wc_add_to_cart_message', array($this, 'added_to_cart_message'), null, 2);
  }

  function add_to_cart_text() {
    return __('Beli', 'dura');
  }

  function added_to_cart_message($message, $product_id) {
    $real_message = preg_replace('/<a\D+a>/', '', $message); // without <a> tag
    $button = sprintf('<a href="%s" class="button wc-forward">%s</a> ', esc_url(wc_get_page_permalink('checkout')), esc_html__('Lanjutkan Pembayaran', 'dura') );

    return $button . $real_message;
  }
}

/*
  Changes to Checkout, Cart, and Order page
*/
class My_Order {

  function __construct() {
    // Add wrapper to checkout order details
    add_action('woocommerce_checkout_after_customer_details', array($this, 'checkout_after_customer_details') );
    add_action('woocommerce_checkout_after_order_review', array($this, 'checkout_after_order_review') );

    // After cart item removed
    add_filter('woocommerce_add_success', array($this, 'remove_add_success') );

    // Send invoice to customer automatically
    add_action('woocommerce_order_status_completed_notification', array($this, 'sendinvoice') );
  }

  /*
    Add wrapper to Checkout Order details so we can float it properly
  */
  function checkout_after_customer_details() {
    echo '<section id="order_details">';
  }
  function checkout_after_order_review() {
    echo '</section>';
  }

  /*
    Remove the alert when removing item from cart
  */
  function remove_add_success($message) {
    if(strpos($message, 'Undo') ) {
      return false;
    }

    return $message;
  }

  /*
    Send invoice to customer automatically
  */
  function sendinvoice($orderid) {
    $email = new WC_Email_Customer_Invoice();
    $email->trigger($orderid);
  }
}
