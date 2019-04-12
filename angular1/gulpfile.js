const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/app')//arquivo app
require('./gulpTasks/deps')//arquivo deps
require('./gulpTasks/server')//arquivo server

gulp.task('default', () => {
  if(util.env.production) {
    sequence('deps', 'app')
  } else {
    sequence('deps', 'app', 'server')
  }
})
