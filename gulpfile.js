var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat			= require('gulp-concat'),
	uglify			= require('gulp-uglify'),
	cssnano			= require('gulp-cssnano'),
	rename			= require('gulp-rename'),
	rigger 			= require('gulp-rigger'),
	del				= require('del'),
	imagemin    	= require('gulp-imagemin'), 
    pngquant    	= require('imagemin-pngquant'); 
    cache      	    = require('gulp-cache'); 



// SASS into CSS
gulp.task('sass', function() { 
  return gulp.src('app/sass/**/*.sass') 
        	.pipe(sass()) 
        	.pipe(gulp.dest('app/css'))
        	.pipe(browserSync.reload({stream: true}))
        	

});

// Autoreloading browser
gulp.task('sync', function() {
	browserSync({
		server: {
			baseDir: 'app' // server's vision field
		},
		notify: false
	});
});

// Script optimisation
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',  
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' 
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

// CSS libs minimisation
gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
})

// Delete production folder's trash before building.
gulp.task('clean', function() {
	return del.sync('dist');
});

// PNG optimisation
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

// Autoreload our files as time as we save it. This function must be placed
// on bottom
gulp.task('watch', ['sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); 
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Building project
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))
});

// A shortcut to cache clearing
gulp.task('clear', function() {
	return cache.clearAll();
});

// Let's start Watch by default command
gulp.task('default', ['watch']);