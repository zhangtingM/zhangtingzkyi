//引入模块

var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var url = require('url');

var path = require('path');

var fs = require('fs')

// var ugli=require('gulp-ugli')

//搭建服务器
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('')
                    return false;
                }
                if (pathname === '') {

                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});

//编译sass

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//watch

gulp.task('watch', function() {
    return gulp.src('./src/scss/*.scss', gulp.series('sass'))
})

//dev

gulp.task('dev', gulp.series('sass', 'server', 'watch'))