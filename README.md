# Edje Framework

A lightweight Sass framework for creating website from scratch.

Other frameworks offers ready-to-use UI kits, which is a good thing. But when you got someone who designed the mock-up for you, all those shiny blings won't be used.

Edje provides just the essential styles such as:

- [Grid System](https://github.com/hrsetyono/edje/wiki/Grid-System)
- [Tile System](https://github.com/hrsetyono/edje/wiki/Tile-System)
- [Visibility](https://github.com/hrsetyono/edje/wiki/Visibility)
- And few others. Visit our [WIKI](https://github.com/hrsetyono/edje/wiki/) for full documentation.


Template generator available as separate package [here](https://github.com/hrsetyono/generator-edje). The installation guide below already included this.


## Installation

**1.** Install [Node JS](https://nodejs.org/download/).

**2.** There are 4 global packages required. Run these commands below one by one.

```
npm publish -g node-sass@3.4.2
npm publish -g edje
npm publish -g yo
npm publish -g generator-edje
```

**3.** If you are on Windows, add `NODE_PATH` to your System Variable and set it to the `npm` installation directory. By default it should be in `C:/Users/yourname/AppData/Roaming/npm/node_modules`

**4.** Test whether it's successfully installed by running the command `npm`. If not found, try restarting your PC and double-check your `NODE_PATH`.

## Getting Started

**CREATING TEMPLATE**

1. Create an empty project directory, then open command prompt inside. [(How?)](https://github.com/hrsetyono/generator-edje#opening-terminal-in-directory)

1. Type in `yo edje` and choose the template you want from the menu.

Read more at our [Generator's repo](https://github.com/hrsetyono/generator-edje).


**COMPILING SASS**

Simply type in `npm run sass` (on Windows) or `npm run sass-mac` (on Mac, Linux) inside your project directory.

This only works in Edje's template. [Follow this guide](https://github.com/hrsetyono/edje/wiki/use-in-existing-project) if you want to run it in your existing project.

## Sample Usage


**GRID in HTML**

```html
<h-row>
  <h-column class="large-8 small-6"> </h-column>
  <h-column class="large-4 small-6"> </h-column>
</h-row>  
```


**SASS Media Query**

```sass
.container {
  padding: 50px;

  @include below(800px) {
    padding: 30px;  
  }

  @include below(480px) {
    padding: 10px;
  }
}
```


Visit our [**WIKI**](https://github.com/hrsetyono/edje/wiki/) for full documentation.

## Pushing Update

Run `npm publish` after updating the version number in package.json.
