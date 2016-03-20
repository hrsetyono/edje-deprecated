(function($) {

var app = {
  init: function() {
    // sample jquery listener format
    $('.something').on('click', this.doSomething);
    $('.something-2').on('click', this.doSomething2);
  },
  doSomething: function(e) {},
  doSomething2: function(e) {},
};

// What to do after document is ready
function start() {
  app.init();
}

$(document).ready(start);
$(document).on('page:load', start);

// Browser compatibility, leave this untouched
if('registerElement' in document) { document.createElement('h-row'); document.createElement('h-column'); }

})(jQuery);
