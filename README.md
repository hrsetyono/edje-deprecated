# Edje Framework

A lightweight Sass framework for creating website from scratch.

Other frameworks offers ready-to-use UI kits, which is a good thing. But when you got someone who designed the mock-up for you, all those shiny blings won't be used.

Edje provides just the essential styles such as:

- [Grid System](https://github.com/hrsetyono/edje/wiki/Grid-System)
- [Tile System](https://github.com/hrsetyono/edje/wiki/Tile-System)
- [Visibility](https://github.com/hrsetyono/edje/wiki/Visibility)
- And few others.


Template generator available as separate package [here](https://github.com/hrsetyono/generator-edje). The installation guide below already included this.


## Installation

1. Install [Node JS v5.4.1](https://github.com/hrsetyono/edje/wiki#installation).

1. There are 4 global packages required. Run these commands below one by one.

    ```
    npm install -g node-sass@3.4.2
    npm install -g edje
    npm install -g yo
    npm install -g generator-edje
    ```

1. If you are on Windows, add **NODE_PATH** to your System Variable and set it to **%AppData%/npm/node_modules**.

1. Test whether it's successfully installed by running the command `npm`. If not found, try restarting your PC and double-check your `NODE_PATH`. If still doesn't work, run these [4 commands](http://stackoverflow.com/a/9588052/1318622) one by one.


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
<h-grid>
  <div class="large-8 small-6"> </div>
  <div class="large-4 small-6"> </div>
</h-grid>  
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
