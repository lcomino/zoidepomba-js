module.exports = function(grunt){
    grunt.initConfig({
      //Tasks here...
      uglify :{
        options : {
          preserveComments : false
        },
        my_target : {
          files : {
            'assets/js/main.js' : ['assets/js/criaNuvens.js', 'assets/js/object.js', 'assets/js/propaganda.js']
          }
        }
      },//uglify
      stylus : {
        compile:{
          options : {

          },
          files : {
            'assets/css/main.css' : ['assets/stylus/main.styl']
          }
        }
      }
    });

    //Plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    //Tasks
    grunt.registerTask('default', ['stylus']);
};
