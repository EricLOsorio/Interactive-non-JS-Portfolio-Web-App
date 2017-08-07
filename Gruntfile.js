module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    babel: {
    
      options: {
      
        sourceMap: true,
	      presets: ['es2015']
      
      },

      dist: {
      
        files: [  
	
	//  'dest/app.js' : 'JS/calculator.js'

	  {
	  
	    expand: true,
	    //cwd : 'src/',
	    src: ['JS/**/*.js'],
	    ext: '.js',
	    dest: 'dest/JS'

	  }
	
	]
      
      }
    
    },


    cssmin: {
      all: {
        files: {
          'dest/app.min.css': ['CSS/*.css']
        }
      }
    },

    uglify: {
      all: {
        files: [
         // 'dest/output.min.js': ['dest/app.js']
       
          {
	  
	    //cwd: 'dest/JS/JS',
	    src: ['dest/JS/JS/*.js'],
	    dest: 'dest/minifiedJS.js'
	  
	  }
       
       ]
      }
    },
    htmllint: {
    
      all: {
    
        options: {
	  
	        ignore: [/Element/, /input/]
	  
	      },

	      src: 'index.html'

      },
   },

    jshint: {
      all: ['JS/*.js'],
      options: {
        browser: true,
	      evil: true,
        asi: true, // Don't worry about missing semicolons
        undef: true, // Warn about undeclared globals
        globals: { // Pass in a list of globals we don't want warnings about
          module: true,
          require: true,
          console: true
        }
      },
      dev: {
        force: true
      }
    },

    sass: {
      dist: {
        options: {
	
	        loadPath: [],
	        style: 'compressed'
	
	      },

        files:[ {
          //'styles/style.css': 'sass/style.scss'
	        expand: true,
	       //cwd: 'SASS',
	       src: ['SASS/**/*.scss'],
	       dest: 'dest/css',
	       ext: '.css'
        }]
      }
    },
    
    watch: {
      scripts: {
        files: ['./**/*.js'],
        tasks: ['jshint:dev'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['index.html'],
	tasks: ['htmllint'],
	options: {
	  livereload: true
	}
      
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['images/*.{png,JPG,bmp,gif,jpg,gif}'],
          dest: 'dest/'
        }]
      }
    },
    
    version: {
      src: ['package.json', 'index.html'],
      options: {
        prefix: '[\\?]?version[\\\'"]?[=:]\\s*[\\\'"]?'
      }
    },
    exec: {
      add: 'git add .', // Add all changed files to the commit
      commit: {
       cmd: function () {
       var oldPkg = this.config('pkg'), // Get the pkg property from our config
          pkg = grunt.file.readJSON('package.json'),
          cmd = 'git commit -am "Updating from ' + oldPkg.version + ' to ' + pkg.version + '"';
            return cmd;
        }
      },
      push: 'git push' // Send our changes to the repository
    }
  });

  grunt.registerTask('build', function(){
    grunt.task.run(['cssmin','babel','uglify','htmllint','jshint','sass','imagemin'])
  });


  grunt.registerTask('deploy', function (releaseType) {
    if (!releaseType) {
      releaseType = 'patch';
    }
    grunt.task.run(['build', 'version::' + releaseType, 'exec:add', 'exec:commit', 'exec:push']);
  });


};
