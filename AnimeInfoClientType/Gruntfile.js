module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true, src: ['*.js', '*.html', '!Gruntfile.js', '!*SpecRunner.html', '!*.js.map'],
                        dest: '../AnimeInfoClient/war', filter: 'isFile'
                    }
                ]
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};