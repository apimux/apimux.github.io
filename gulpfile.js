const fs = require('fs')
const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')

const tasks = {
    
    clean: () => { 
        
        let files = [ './app/style.css', './app/apimux.js' ]
        
        for (var file in files) 
            try { fs.unlinkSync(files[file]) } 
            catch(e) { } 
    },

    compile_css: () => { 
        
        let src = gulp.src('./src/scss/**/*.scss')
        let dest = gulp.dest('./app')

        return src.pipe(sass().on('error', sass.logError)).pipe(dest) 
    },

    compile_js: () => {

        let src = gulp.src([ './src/js/lib/*.js', './lib/file1.js' ])
        let dest = gulp.dest('./app')
        
        return src.pipe(concat('apimux.js')).pipe(dest)
    },

    watch: () => {

        return gulp.watch('./src/**/*', [ 'build' ]);
    },

    build: [ 'clean', 'compile_css', 'compile_js' ]
}

for (var task in tasks) gulp.task(task, tasks[task])