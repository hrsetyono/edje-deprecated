# Edje Framework

A lightweight Sass framework for creating website from scratch.

Other frameworks offers tons of ready-to-use UI kits, which is a good thing. But when you got someone who designed the mock-up for you, all those shiny blings won't be touched.

This framework provides just the bare essential: **Super customizable Grid**.

Visit our [**WIKI**](https://github.com/hrsetyono/edje/wiki/) for full documentation.

## Installation

1. Install [Node JS](https://nodejs.org/download/).

2. Install Sass and Edje by opening command prompt (as admin) and type: `npm install -g node-sass` and then `npm install -g edje`

3. If you are on Windows, add `NODE_PATH` to your System Variable and set it to the `npm` installation directory. By default it should be in `C:/Users/yourname/AppData/Roaming/npm/node_modules`

## Getting Started

**CREATING TEMPLATE**

1. Create an empty project directory.

2. Open command prompt inside (SHIFT + Right-click on directory icon).

3. Type in `edje create` and choose the template you want from the menu.

**COMPILING SASS**

There are two ways:

1. **Built-in** - Simply type in `npm run sass` (on Windows) or `npm run sass-mac` (on Mac, Linux) inside your project directory.

2. **Using Grunt** - This one takes time to setup, type `npm install` and then `grunt` after finished.

Both has the same result, but the Grunt one has prettier debugging log.

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
