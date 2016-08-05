module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['pricing.js'],
        dest: 'pricing_src.js',
      },
    },
    browserify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        transform: [
          [
            "babelify", {
              presets: ["es2015", "react"]
            }
          ]
        ]
      },
      build: {
        src: 'pricing_src.js',
        dest: 'pricing_bundle.js'
      }
    },
    less: {
      development: {
          files: {
            "pricing.css": "pricing.less"
          }
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask("build", ["less", "concat", "browserify"]);
};
