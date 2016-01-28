module.exports = function(grunt) {

// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['css/bootstrap.css', 'css/style.css'],
                dest: 'css/concat.css'
            },
            js: {
                src: ['node_modules/jquery/dist/jquery.js', 'js/js.js'],
                dest: 'js/concat.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'css/style.min.css': 'css/concat.css'
                }
            }
        },
        less: {
            bootstrap: {
                options: {
                    paths: ['node_modules/bootstrap/less'],
                    ieCompat: false
                },
                files: {
                    'css/bootstrap.css': 'less/bootstrap.less'
                }
            },
            style: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['ie >= 9, last 1 versions']})
                    ],
                    ieCompat: false
                },
                files: {
                    'css/style.css': 'less/style.less'
                }
            }
        },
        uglify: {
            scripts: {
                files: {
                    'js/js.min.js': ['js/concat.js']
                }
            }
        },
        watch: {
            css: {
                files: 'less/*.less',
                tasks: ['less','concat:css','cssmin']
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat:js','uglify']
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // The default task.
    grunt.registerTask('default', ['watch']);

};