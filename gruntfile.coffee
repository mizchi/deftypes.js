module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    connect:
      server:
        options:
          port: 8888
          base: '.'

    coffee:
      compile:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee']
          dest: 'lib/'
          ext: '.js'
        ]

    watch:
      coffee:
        files: "src/**/*.coffee",
        tasks: ["build"]

    concat:
      app:
        src:[
          "lib/browser.js"
          "lib/option.js"
          "lib/primitive.js"
          "lib/types.js"
          "lib/typecheck.js"
          "lib/def.js"
          "lib/index.js"
        ]
        dest: "deftypes.js"

  grunt.registerTask "run", ["coffee","concat", "connect", "watch"]
  grunt.registerTask "build", ["coffee","concat"]
