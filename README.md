# Edje Framework
Edje is a **Functional Sass framework**. Basically we provide many shorthand styles, so instead of writing `padding: 1em`, we just write `p1`.

To make it clearer, here's an example of a class definition:

```sass
.page-thumbnail {
  background-color: red;
  border: 2px solid rgba(black, 0.5);
  padding: 1em;
}
```

Using **Edje framework**, we wrote it like this:

```sass
.page-thumbnail {
  @include h( bg-red  b2  b-black50  p1 );
}
```

Those mini styles are defined by Edje and easily customizable by overriding a Sass variable.

Some benefits based on our team's experience are:

- **Compact Codebase** - Easier to skim through the code.

- **Instant Styleguide** - All variables are stored in `_settings.scss`, that automatically become a styleguide to your team.

- **Faster development** - You might say using full-fledged framework like Bootstrap is faster. But we actually spent longer time trying to override or customize their default styling.

- **Fun**. Yeah I know that this is subjective. But for us, combining a bunch of small things to create larger entity is enjoyable.

[Read full documentation here](https://hrsetyono.github.io/edje/)

-----

## Media Query

We used intuitive naming to make it easy to know the target size for the media query block.

```sass
.button {
  @include h( p1 );

  @media ($below-s) {
    @include h( p05 );
  }
}
```

There are 4 default breakpoint: Extra Small (`xs`) is 480px, Small (`s`) is 767px, Medium (`m`) is 960px, and Large (`l`) is 1120px. You can use those sizes with the combination of word "below-" and "above-".

[Read media query documentation here](https://hrsetyono.github.io/edje/#/helper/media-query)

-----

## Installation

1. Install [Node JS](https://nodejs.org/en/download/).

1. Run the command `npm install -g node-sass` and `npm install -g edje`.

1. For Windows user, open Command prompt and type these 4 commands one by one:

    ```
    rem for future
    
    setx NODE_PATH %AppData%\npm\node_modules
    
    rem for current session
    
    set NODE_PATH=%AppData%\npm\node_modules
    ```

1. Test if Edje is successfully installed by running this command `node -p "require('edje')"`. If it doesn't give "Module not found: Edje" error, then everything is set!

-----

## Documentation

Visit [https://hrsetyono.github.io/edje](https://hrsetyono.github.io/edje) for full documentation.