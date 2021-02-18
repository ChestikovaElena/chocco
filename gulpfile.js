const { src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

// task('copy:html', () => {
//   return src(`${SRC_PATH}/*.html`)
//   .pipe(dest(`${DIST_PATH}`))
//   .pipe(reload({stream: true}));
// });

task('html', () => {
  return src(`${SRC_PATH}/*.html`)
  .pipe(gulpif(env === 'prod', htmlmin({ collapseWhitespace: true })))
  .pipe(dest(`${DIST_PATH}`))
  .pipe(reload({stream: true}));
});

task('styles', () => {
  console.log(env);
  return src([...STYLE_LIBS, `${SRC_PATH}/css/main.scss`])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss')) //объединение файлов
  .pipe(sassGlob()) //групповой импорт файлов
  .pipe(sass().on('error', sass.logError)) //из sass в css
  .pipe(gulpif(env === 'dev',
    autoprefixer({
      cascade: false
    })
  ))
  .pipe(gulpif(env === 'prod', gcmq())) //группировка медиа-запросов
  .pipe(gulpif(env === 'prod', cleanCSS())) //минификация
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}`))
  .pipe(reload({stream: true}));
});

// task('scripts', () => {
//   return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
//   .pipe(gulpif(env === 'prod', uglify()))
//   .pipe(dest(`${DIST_PATH}/js/`))
//   .pipe(reload({stream: true}));
// })

task('scripts', () => {
  return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js', {newline: ";"}))
  .pipe(gulpif(env === 'prod', babel({
    presets: ['@babel/env']
  })))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}/`))
  .pipe(reload({stream: true}));
})

task('icons', () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/img/icons`));
 });

task('images', () => {
  return src(`${SRC_PATH}/img/**/*.{jpg,png,webp}`)
    .pipe(imagemin())
    .pipe(dest(`${DIST_PATH}/img/`));
})

task('video', () => {
  return src(`${SRC_PATH}/video/*.mp4`)
  .pipe(dest(`${DIST_PATH}/video`));
})

task('server', () => {
  browserSync.init({
      server: {
          baseDir: `./${DIST_PATH}`
      },
      open: false
  });
});

task('watch', () => {
  watch(`${SRC_PATH}/css/**/*.scss`, series('styles'));
  watch(`${SRC_PATH}/*.html`, series('html'));
  watch(`${SRC_PATH}/js/*.js`, series('scripts'));
  watch(`${SRC_PATH}/img/icons/*.svg`, series('icons'));
  watch(`${SRC_PATH}/img/**/*.{jpg,png,webp}`, series('images'));
});

task('build',
 series(
   'clean',
   parallel('html', 'styles', 'scripts', 'icons', 'images', 'video'))
);

task('default',
  series(
    'clean',
    parallel('html', 'styles', 'scripts', 'icons', 'images', 'video'),
    parallel('server')
  )
);