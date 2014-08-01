module.exports = function(grunt) {

    grunt.initConfig({
        docco: {
            client: {
                options: {
                    output: "docs/client"
                },
                src: [
                    "client/js/collection/*.js",
                    "client/js/models/*.js",
                    "client/js/views/*.js",
                    "server/server.js"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-docco-multi");

    grunt.registerTask("default", ["docco"]);
};
