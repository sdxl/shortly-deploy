module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      //your code here
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      js: {
        src: [
              'public/client/*.js',
             ],
        dest: 'public/dist/<%= pkg.name %>.js'
      },
      css: {
        src:  'public/*.css',
        dest: 'public/dist/<%= pkg.name %>.css'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec' //nyan, xunit, html-cov, dot, min, markdown
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //    mangle: false
      },
      build: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['public/dist/<%= pkg.name %>.js']
        }
      }
    },

    jshint: {
      files: [
        'public/client/*.js',
        'public/lib/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/dist/<%= pkg.name %>.min.css': ['public/dist/<%= pkg.name %>.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/*.js',
          'public/lib/*.js',
        ],
        tasks: [
          'concat',
          'uglify',
          'jshint',
          'mochaTest'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      },
      server: {
        files: './*.js',
        tasks: ['mochaTest']
      }
    },

    shell: {
      prodServer: {
        //can be used to auto-deploy to Heroku/Azure.
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
    //your code here
  ]);

  grunt.registerTask('build', [
    //your code here
  ]);

  //can be used to auto-deploy.
  grunt.registerTask('upload', function(n) {
    //Grunt options are ways to customize tasks.  Research ways to use them.
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
