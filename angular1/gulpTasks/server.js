const gulp = require('gulp')//automatização
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

gulp.task('watch', () => {
  watch('app/**/*.html', () => gulp.start('app.html'))
  watch('app/**/*.css', () => gulp.start('app.css'))
  watch('app/**/*.js', () => gulp.start('app.js'))
  watch('assets/**/*.*', () => gulp.start('app.assets'))

})
//configuração da porta da aplicação
gulp.task('server', ['watch'], () => {
  return gulp.src('public').pipe(webserver({
    livereload: true,
    port: 3000,
    open: true
  }))
})
