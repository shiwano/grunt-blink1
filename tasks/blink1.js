/*
 * grunt-blink1
 * https://github.com/shiwano/grunt-blink1
 *
 * Copyright (c) 2012 Shogo Iwano
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
  var async = require('async'),
      Color = require('color'),
      Blink1 = require('node-blink1'),
      _ = require('lodash'),
      _blink1;

  var getBlink1 = function() {
    if (!_.isUndefined(_blink1)) {
      return _blink1;
    }

    if (_.isEmpty(Blink1.devices())) {
      return null;
    } else {
      _blink1 = new Blink1.Blink1();
      return _blink1;
    }
  };

  grunt.registerMultiTask('blink1', 'Blink a specific color on blink(1)', function() {
    var options = this.options({
      fadeMillis: 0,
      turnOff: false,
      ledIndex: 0
    });
    var colors = [this.data.color || 'black'];
    colors = (_.isArray(this.data.colors)) ? this.data.colors : colors;

    var blink1 = getBlink1();

    if (_.isNull(blink1)) {
      grunt.log.writeln('No blink(1)\'s could be found.');
      return;
    }

    if (options.turnOff) {
      colors.push('black');
    }

    var taskDone = this.async();

    async.forEachSeries(colors, function (color, done) {
      var c = new Color(color);

      if (options.fadeMillis > 0) {
        blink1.fadeToRGB(options.fadeMillis, c.red(), c.green(), c.blue(), options.ledIndex, done);
      } else {
        blink1.setRGB(c.red(), c.green(), c.blue(), done);
      }
    }, function () {
      taskDone();
    });
  });
};
