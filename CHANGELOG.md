## 2.2.0

- Removed Functional CSS feature, replacing it with Functional Sass. [Read full doc here](https://hrsetyono.github.io/edje/)

## 2.1.0

- Added functional CSS feature.  
- Changed screen sizing name from mini, small, medium, and large to: `xs`, `s`, `m`, and `l`.
- Changed grid column name from large-x and small-x to: `col-x` and `col-x-s`.
- Changed old v2 to v1.8

## 2.0.2

- Changed PRINT styling to not be included by default.
- Fixed VISIBILITY messing up due to `display: inherit`.

## 2.0.1

- New mixin `supports` is on beta. [Read More](https://github.com/hrsetyono/edje/wiki/Generic-Mixin-and-Function#supports-20)
- [Prefixer] Remove animation prefixer because it's no longer needed.


## 2.0.0

- Version 2 released!
- [Grid] Now uses CSS3 grid. [Read More](https://github.com/hrsetyono/edje/wiki/Grid-System)
- [Tile] Now uses <h-tile> element for the wrapper. [Read More](https://github.com/hrsetyono/edje/wiki/Tile-System)
- [Animate] Out of beta, no longer need to set `$include-animate` variable to true.
- [Animate] Removes vendor prefixes.

## 1.5.1

- [Normalize] Removed the CSS that removes native Datepicker. Applied on all versions.

## 1.5.0

- Latest node-sass (4.9) and most-stable NodeJS (8.11) is now supported.
- Version 1.4.0 is removed.

BREAKING CHANGES:

- `$version` variable is no longer needed.
- The import path needs to include the version number.

    The top of your **app.scss** should look like this:

    ```
    @import "setting";
    @import "edje-v15";
    ```

    The top of your **framework.scss** should look like this:

    ```
    @import "setting";
    $output-framework: true;
    @import "edje-v15";
    ```

- Currently there are three versions available: edje-v0 (old), edje-v1 (stable), and edje-v15 (on development).

## 1.4.0

- To use this version, change `$version` variable in setting to `1.4`.

Breaking changes:

- Changes in default setting value to make it more like WordPress.com

## 1.3.0

- [Tile] Tile now uses Flexbox. Markup stays the same.

## 1.2.3

- Update prefixer to latest browser compatibility.
- Draft for v2.0 with CSS3 Grid

## 1.2.2

- Added [Typography mixin](https://github.com/hrsetyono/edje/wiki/Typography-Mixin).
- Added [Browser prefixer](https://github.com/hrsetyono/edje/wiki/Generic-Mixin-and-Function#css3-prefixer).

## 1.2.1

- Fix error during installation due to missing binary

## 1.2.0
- [Template] Removed from CORE. Now available in Yeoman. Install it by running `npm install -g yo` and `npm install -g generator-edje`. To generate template, run `yo edje`.

## 1.1.0

- [Sass] New Visibility styling. Use `hide-for-small` to hide the element on small screen and below!
- [Template] New WordPress and plugins version.

## 1.0.3

- New WordPress plugin versions.
- WordPress theme now follows more standard practices.
- All SEO meta tags in theme are now handled by Edje-WP plugin.

## 1.0.2

- Fixed error when importing Sass version 0.

## 1.0.1

- Added WordPress 4.5.2 and all latest default plugins.

## 1.0.0

Not compatible with version 0. If you need to compile older project, change the following:

- In *_setting.scss* add `$version: 0;` at the top.
- In *app.scss* change `@import "edje/helper";` to `@import "edje";`.
- In *framework.scss* change `@import "edje";` to `@import "edje-framework";`.

Sass changes:

- Default body font size is now 16px.

- Global transition duration is now 0.25s.

- New variable for all headers. The `$h1-sizes` defines the list of H1 font sizes for various screens. For example if the value is `(base: 42px, small: 30px)`, it means by default it's 42px but below *Small* screen (767px) it become 30px.

## 0.3.2

- Add ACF Options code in WordPress functions.
- Better WooCommerce and WordPress template.
