//https://levelup.gitconnected.com/how-to-setup-your-workflow-using-gulp-v4-0-0-5450e3d7c512

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    replace = require('gulp-replace'),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/assets/scss/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "src/dist/css"
    },
    js: {
	    src: "src/assets/js/**/*.js",
	    dest: "src/dist/js"
    },
    images: {
	    src: "src/images/*",
	    dest: "src/dist/images"
    },
    fonts: {
	    src: "src/fonts/*",
	    dest: "src/dist/css/fonts"
    }
};

/* Optimize our scss files */
function style() {
    return gulp
        .src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}

/* Optimize our images */
function image() {
	return gulp
	.src(paths.images.src)
	.pipe(imagemin())
	.pipe(gulp.dest(paths.images.dest))
	.pipe(browserSync.stream());
}

/* Copy out fonts over to dist */
function font() {
	return gulp
	.src(paths.fonts.src)
	.pipe(gulp.dest(paths.fonts.dest));
}

/* Optimize and concat our scripts */
function script() {
	return gulp
	.src(['src/lib/bootstrap/js/jquery-3.3.1.slim.min.js', 'src/lib/bootstrap/js/popper.min.js', 'src/lib/bootstrap/js/bootstrap.4.3.min.js', 'src/assets/js/main.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.js.dest))
	.pipe(browserSync.stream());
}

/* Cache busting by adding timestamp query string to our optimized files */
var timeStamp = new Date().getTime();
function cacheBust() {
	return gulp
	.src(['src/index.html'])
	.pipe(replace(/cb=\d+/g, 'cb=' + timeStamp))
	.pipe(gulp.dest('./src/.'));
}

// A simple task to reload the page
function reload() {
    browserSync.reload();
}


// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./src"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.js.src, script);
    gulp.watch(paths.images.src, image);
    gulp.watch(paths.fonts.src, font);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("src/*.html", reload);
}

// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
exports.image = image;
exports.font = font;
exports.script = script;
exports.cacheBust = cacheBust;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(style, image, font, script, cacheBust, watch);

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);