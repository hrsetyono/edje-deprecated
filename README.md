Edje Framework
===============

A lightweight Sass framework for creating website from scratch.

BROWSER SUPPORT
------------------

All modern browsers:

- Chrome, Firefox, Safari, Opera
- Android 4.0 and above
- IE 9 and above

Installation
-----------------

1. Install [Node JS](https://nodejs.org/download/).

2. Open command prompt (as admin) and type `npm install -g node-sass`.

3. Then type `npm install -g edje`.

Getting Started
------------------

Open command prompt and run `edje template` **inside** your project directory. Choose the template you want by inputting in the number.

Follow the guide given in the success message. For example HTML template needs to run `npm install` then `grunt` to compile Sass.

Table of Content
------------------

1. [Grid System](#grid-system)

2. [Grid System - Tile](#grid-system---tile)

3. [Sass](#sass)

4. [Grid mixin](#grid-mixin)

5. [Adaptive Grid](#adaptive-grid)

6. [Tile mixin](#tile-mixin)

7. [WordPress](#wordpress)

8. [Email](#email)

Grid System
==================
    
    <h-row>
    <h-column>
    .large-x
    .small-x

Our Grid is divided into **12 columns**. Start with `<h-row>` followed by `<h-column>`.

    <h-row>
      <h-column class="large-8"></h-column>
      <h-column class="large-4"></h-column>
    </h-row>

![Edje Grid - Large only](http://cdn.setyono.net/edge/grid-large.jpg)

    <h-row>
      <h-column class="large-8 small-6"></h-column>
      <h-column class="large-4 small-6"></h-column>
    </h-row>

![Edje Grid - Large and Small](http://cdn.setyono.net/edge/grid-large-small.jpg)

**Note**:

- Large is above 768px by default.

- Small is below or equal to 768px.

Nesting
-----------

    <h-row>
      <h-column class="large-8">
        <h-row>
          <h-column class="large-2"></h-column>
          <h-column class="large-10"></h-column>
        </h-row>
      </h-column>
      <h-column class="large-4"></h-column>
    </h-row>

![Edje Grid - Nesting](http://cdn.setyono.net/edge/grid-nesting.jpg)

Collapse
-----------

    .collapse

Remove the gutter.

    <h-row class="collapse">
      <h-column class="large-9 small-6"></h-column>
      <h-column class="large-3 small-6"></h-column>
    </h-row>

![Edje Grid - Collapse](http://cdn.setyono.net/edge/grid-collapse.jpg)

Centering
-----------

    .centered
    .small-centered

Horizontally centering a column.

It is inherited on small screen.

    <h-row>
      <h-column class="large-7 small-7 centered"></h-column>
    </h-row>

![Edje Grid - Centered](http://cdn.setyono.net/edge/grid-centered.jpg)

Offset
-----------

    .offset-x
    .small-offset-x

Offset leaves a **gap** before the column.

It is ignored on small screen unless the small offset is specified.

    <h-row>
      <h-column class="large-2 column"></h-column>
      <h-column class="large-6 offset-4 column"></h-column>
    </h-row>

![Edje Grid - Offset](http://cdn.setyono.net/edge/grid-offset.jpg)


Grid System - Tile
=================
    
    <ul>
    <li>
    .tile-x
    .small-tile-x

Evenly divides a list into block size.

    <ul class="tile-3 small-tile-2">
      <li> 1 </li>
      <li> 2 </li>
      <li> 3 </li>
      <li> 4 </li>
      <li> 5 </li>
    </ul>

![Edje Grid - Tile](http://cdn.setyono.net/edge/grid-tile.jpg)

Each tile will expand 100% on small screen when the small size is not specified.

Just like row, you can collapse it to remove the gutter:

    <ul class="tile-7 collapse"> ... </ul>

**Note**:

- The `ul` and `li` elements have magic in it. So try not to add your own styling there.


Sass
=================

![Edje Sass](http://cdn.setyono.net/edge/sass-edge.jpg)


Run `grunt` in your project directory to start compiling the Sass.

There is a setting file at `assets/sass/_settings.sccs`. You can customize the framework here by uncommenting the variable.

For example, we want our grid to be divided into 8. Find this line in the setting:

    // $grid-columns : 12;
    
Become:

    $grid-columns : 8;

## EM Converter
    
    .post p {
      font-size: em(14px);  
    }

    // Result
    .post p {
      font-size: 0.875em;
    }

The default em size is 16px. It is defined in variable `$font-size`.

If the base size is not default, pass it as second parameter:
    
    <h1 class="title">
      Hello <em>World</em>
    </h1>

    .title {
      font-size: em(40px);

      em {
        font-size: em(45px, 40px);
      }
    }

## Media Query mixin

    below($size)
    above($size)
    between($smaller-size, $larger-size)

The parameter `$size` can accept pixel or keyword. Available keywords are `large`, `medium`, `small`, and `mini`. They correspond to our sizing variable in setting.

    p {
      color: black;

      @include below(medium) {
        color: blue;
      }

      @include below(960px) {
        color: red;
      }

      @include below(small) {
        color: yellow;
      }
    }

**Note**

- *Below* means less than or equal to (`<=`).

- *Above* means more than (`>`).

- *Between* is inclusive to both (`>= smaller-size` and `<= larger-size`).


Grid mixin
=============

    row()
      $gutter   (px) Distance between columns
      $rim      (px) Distance from edge of screen
      $width    (px) Grid's max width
      $collapse (bool)

    column()
      $size     (int) Large sizing
      $small    (int) Small sizing
      $mini     (int) Mini sizing
      $offset   (int) Large offset
      $centered (bool)
      $total    (int) Total number of columns
      
Custom grid makes the markup cleaner and easier to change.

    // HTML
    <h-row>
      <h-column class="sidebar"></h-column>
      <h-column class="content"></h-column>
    </h-row>


    // SCSS
    .sidebar {
      @include column($size: 2, $small: 4, $mini: 12);
      // or
      @include column(2, 4, 12);
    }

    .main {
      @include column(10, 8, 12);
    }

**Note**:

- Custom row and column MUST be applied to `h-row` and `h-column` elements respectively.

### Gutter

Custom gutter is applied to the row

    // HTML
    <h-row class="my-row">
      <h-column class="large-3"></h-column>
      <h-column class="large-9"></h-column>
    </h-row>


    // SCSS
    .my-row {
      @include row($gutter: 50px);
    }

### Responsive Gutter

Unlike the column's sizing. There's no parameter called `small-gutter` or `mini-gutter`.

So, the workaround is to use media query:

    .my-row {
      @include row($gutter: 50px);

      @include below(small) {
        @include row($gutter: 20px);
      }
    }

**Note**:

- Use the same workaround for column's `offset`.

### Collapse

Collapse is also applied to the row
    
    // HTML
    <h-row class="my-row">
      ...
    </h-row>


    // SCSS
    .my-row {
      @include row($collapse: true);
    }

### Total Columns

You can either use `$total` parameter or fraction:
      
    .content {
      @include column($size: 7, $offset: 3, $total: 15);
    }

    // or

    .content {
      @include column($size: 7 / 15, $offset: 3 / 15);
    }

Adaptive Grid
======================

**Responsive grid** is always as wide as the screen size. This means you must ensure the site looks fine on every sizes.

**Adaptive grid** follows the predefined sets of widths.

Let's say the sets are 1120px, 960px and 720px. When the screen reaches below 1120px, the grid will become 960px, leaving empty gap on the sides.

To use this, go to `settings.scss` and change the variable `$adaptive` to true. You can add more breakpoints in the variable `$adaptive-breakpoint`. Just make sure it's ordered **descendingly**.


Tile mixin
======================

    tile()
      $size      (int)
      $small     (int)
      $mini      (int)
      $gutter    (px)
      $collapse  (bool)

The **class** for custom tile MUST contain the word "tile"

    <ul class="product-tile">
      <li> ... </li>
      <li> ... </li>
    </ul>

    .product-tile {
      @include tile(7, 4, 2);
    }

WordPress
====================

![Edje Wordpress](http://cdn.setyono.net/edge/wp-edge.jpg)

Our WordPress template requirs [Timber](https://wordpress.org/plugins/timber-library/). It is a template engine that separates PHP and HTML into their own file, reducing the amount of "spaghetti" code.

### CPT - Custom Post Type

![Wordpress Custom Type](http://cdn.setyono.net/edge/wp-post-type.jpg)

    add_post_type( $name, <$args_array> )

The `$name` MUST be one-word, singular, and titleized case. Example:

    add_post_type( "Product" );
    add_post_type( "Event" );

Optional arguments list:

*icon* - Icon names are listed here [melchoyce.github.io/dashicons/](http://melchoyce.github.io/dashicons/). Exclude the "dashicons-".

*taxonomy* - The custom category term. The naming convention is the same as CPT's name.

*columns* - Array of columns shown in admin panel. Possible values are: `title`, `author`, `date`, `thumbnail`, and any custom field.

Example:

    add_post_type( "Product" , array(
      "icon" => "cart",
      "taxonomy" => "Brand",
      "columns" => array("thumbnail", "title^", "price^", "date")
    ) );

Notice the `^` at the end of column's name? That indicates that the column is sortable.

Email
=============

With the task `grunt build`, all external CSS will be inlined.

You can also send a test email with `grunt send`. But first you need to configure your **sender and receiver** in Gruntfile's "nodemailer" section.

**WARNING** - The configuration requires your email's password written in plain text. For safety, create a NEW Gmail address to be used as sender.