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
