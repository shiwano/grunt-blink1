# grunt-blink1

> Configures blink(1) inside your Gruntfile.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-blink1 --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-blink1');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "blink1" task

### Overview
In your project's Gruntfile, add a section named `blink1` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  blink1: {
    your_target: {
      colors: ['red', '#000', 'rgb(0, 255, 0)'],
      turnOff: true,
      fadeMillis: 200
    }
  }
})
```

### Properties

#### colors
Type: `String` or `Array`
Default value: None (Required)

A value that is given to blink(1) for blink. [CSS color string](http://www.w3.org/TR/CSS21/syndata.html#color-units) is available.

#### turnOff
Type: `Boolean`
Default value: `false`

If this value is true, blink(1) turns off at last.

#### fadeMillis
Type: `Number`
Default value: `0`

A value determining how long the blink(1) will change.

#### pickDevice
Type: `Function`
Default value: `undefined`

A Function to select a device which is used by this task. It takes `devices` arguments.

## Examples

```js
grunt.initConfig({
  blink1: {
    green: {
      colors: 'green'
    },
    red: {
      colors: 'red'
    }
  }
});
grunt.registerTask('test', ['blink1:red', 'simplemocha', 'blink1:green']);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
 * 2012-12-29   v0.1.0   First release.

## License
Copyright (c) 2012 Shogo Iwano
Licensed under the MIT license.
