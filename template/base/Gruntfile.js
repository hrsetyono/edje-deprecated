'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    path: {
      assets: 'assets',
      css: [ '<%= path.assets %>/css' ],
      sass: [ '<%= path.assets %>/sass' ],
      js: [ '<%= path.assets %>/js' ]
    },

    sass: {
      options: {
        includePaths: require('edje').includePaths()
      },
      dev: {
        options: {
          outputStyle: 'compact',
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: '<%= path.sass %>/',
          src: ['**/*.scss'],
          dest: '<%= path.css %>/',
          ext: '.css'
        }]
      },
    },

    watch: {
      sass: {
        files: [
          '<%= path.sass %>/**/*.{scss,sass}'
        ],
        tasks: ['sass:dev']
      }
    },
  });

  grunt.registerTask('default', ['watch']);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
