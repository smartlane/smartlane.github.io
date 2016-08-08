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
        dest: 'pricing_browserified.js'
      }
    },
    less: {
      development: {
          files: {
            "pricing.css": "pricing.less"
          }
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'pricing_bundle.js': ['pricing_browserified.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask("build", ["less", "concat", "browserify", "uglify"]);
};
