module.exports = function (grunt) {
  var libs = [
    'angular/angular.js',
    'angular-cookies/angular-cookies.js',
    'jquery/dist/jquery.js',
    'bootstrap/dist/js/bootstrap.js',
    'bootstrap/dist/css/bootstrap.css',
    'jquery.dav/jquery.dav.js',
    'markdown/lib/markdown.js'
  ];

  grunt.initConfig({
    jshint: {
      files: ['src/js/**/*.js']
    },
    copy: {
      main: {
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
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/lib.min.js': 'build/lib/*.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'copy']);
  grunt.registerTask('dist', ['jshint', 'copy', 'uglify']);
};