module.exports = function (grunt) {
  var libs = [
    'angular/angular.js',
    'angular-cookies/angular-cookies.js',
    'jquery/dist/jquery.js',
    'bootstrap/dist/js/bootstrap.js',
    'jquery.dav/jquery.dav.js',
    'markdown/lib/markdown.js',
    'underscore/underscore.js'
  ];

  grunt.initConfig({
    jshint: {
      files: ['src/js/**/*.js']
    },
    copy: {
      build: {
        files: [
          {
            cwd: 'bower_components/',
            expand: true,
            flatten: true,
            src: libs,
            dest: 'build/lib/'
          },
          {
            cwd: 'src/',
            expand: true,
            src: '**',
            dest: 'build/'
          },
          {
            src: 'bower_components/bootstrap/dist/css/bootstrap.css',
            dest: 'build/css/bootstrap.css'
          }
        ]
      },
      dist: {
        files: [
          {
            cwd: 'src/',
            expand: true,
            src: ['**', '!**/*.js'],
            dest: 'dist/',
            filter: 'isFile'
          },
          {
            src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
            dest: 'dist/css/bootstrap.min.css'
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: [
          {
            src: libs.map(function (f) { return 'bower_components/' + f; }),
            dest: 'dist/js/lib.min.js'
          },
          {
            src: ['build/js/main.js', 'build/js/**/*.js'],
            dest: 'dist/js/app.min.js'
          }
        ]
      }
    },
    watch: {
      source: {
        files: 'src/**',
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'copy:build']);
  grunt.registerTask('dist', ['jshint', 'copy:build', 'uglify', 'copy:dist']);
};