
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            'server-side': {
                options: {
                    reporter: 'json',
                    clearRequireCache: true,
                    colors: true,
                    quite: true,
                    captureFile: 'mochatest.json'
                },
                src: ['tests/server/*.js']
            },
            'server-side-spec': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    colors: true,
                    quite: true
                },
                src: ['tests/server/*.js']
            },
            'client-side-spec': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    colors: true,
                    quite: true,
                },
                src: ['tests/client/report.spec.js']
            },
            'fvt': {
                options: {
                    reporter: 'json',
                    clearRequireCache: true,
                    colors: true,
                    quite: true,
                    captureFile: 'mochafvt.json'
                },
                src: ['tests/server/*.js']
            }
        },

        clean: {
            options: {
                force: true,
                expand: true
            },
            coverage: ['tests/coverage'],
            apidocs: ['apidoc']
        },

        copy: {
            resourcesForInstrumented: {
                nonull: true,
                files: [{
                    expand: true,
                    dest: 'tests/coverage/instrumented',
                    src: 'routes/*.js',
                }]
            }
        },

        instrument: {
            files: ['routes/*.js', 'dataprovider/*.js'],
            options: {
                lazy: false,
                basePath: 'tests/coverage/instrumented/'
            }
        },

        storeCoverage: {
            options: {
                dir: 'tests/coverage/reports'
            }
        },

        makeReport: {
            src: 'tests/coverage/reports/*.json',
            options: {
                type: 'json-summary',
                dir: 'tests/coverage/reports',
                file: 'coverage-summary.json'
            }
        },

        'makeReport-lcov': {
            src: 'tests/coverage/reports/*.json',
            options: {
                type: 'lcov',
                dir: 'tests/coverage/reports'
            }
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-istanbul');

    grunt.renameTask('makeReport', 'makeReport-lcov');
    grunt.loadNpmTasks('grunt-istanbul');

    grunt.registerTask('fvt-test', ['mochaTest:fvt']);
    grunt.registerTask('dev-test', ['clean:coverage', 'copy:resourcesForInstrumented', 'instrument', 'mochaTest:server-side-spec']);
    grunt.registerTask('dev-test-cov', ['clean:coverage', 'copy:resourcesForInstrumented', 'instrument', 'mochaTest:server-side', 'storeCoverage', 'makeReport-lcov', 'makeReport']);
    grunt.registerTask('dev-uitest', ['mochaTest:fvt']);

};