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
      _ = (typeof grunt.utils === 'undefined') ? grunt.util._ : grunt.utils._;

  grunt.registerMultiTask('blink1', 'Blink a specific color on blink(1)', function() {
    var colors = (_.isArray(this.data.colors)) ? this.data.colors : [this.data.colors || 'black'],
        fadeMillis = this.data.fadeMillis || 0,
        turnOff = this.data.turnOff || false,
        devices = Blink1.devices(),
        serialNumber;

    if (_.isEmpty(devices)) {
      grunt.log.writeln('No blink(1)\'s could be found.');
      return;
    } else if (_.isFunction(this.data.pickDevice)) {
      serialNumber = this.data.pickDevice(devices);
    }

    if (turnOff) {
      colors.push('black');
    }

    var blink1 = new Blink1.Blink1(serialNumber),
        taskDone = this.async();

    async.forEachSeries(colors, function (color, done) {
      var c = new Color(color);

      if (fadeMillis > 0) {
        blink1.fadeToRGB(fadeMillis, c.red(), c.green(), c.blue(), done);
      } else {
        blink1.setRGB(c.red(), c.green(), c.blue(), done);
      }
    }, function () {
      taskDone();
    });
  });
};
