const gulp = require('gulp')
const sync = require('browser-sync')

// для работы с цсс
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const atImport = require('postcss-import')
const postcssCustomProperties = require('postcss-custom-properties')
const cssnano = require('cssnano')
const doiuse = require('doiuse')
const nested = require('postcss-nested')

const BASE_DIR = './'
const config = {
	paths: {
		entry: {
			css: `${BASE_DIR}src/css/*.css`,
			allcss: `${BASE_DIR}src/css/**/*.css`,
		},
		output: {
			css: `${BASE_DIR}assets/css`,
		},
		watch: {
			css: `${BASE_DIR}src/css/**/*.css`,
		}
	}
}

//компилим css
const css = () => {
    let plugins = [
		atImport(),
		nested(),
		autoprefixer(),
		postcssCustomProperties(),
        cssnano()
    ]
	return gulp
		.src(config.paths.entry.css)
		.pipe(postcss(plugins))
		.pipe(gulp.dest(config.paths.output.css))
		.pipe(sync.stream())
}
exports.css = css

// лог поддержки цсс браузерами
const cssSupport = () => {
    let plugins = [
		nested(),
		autoprefixer(),
		doiuse({
			browsers: ['last 2 versions'],
			ignore: ['rem'], // an optional array of features to ignore
			onFeatureUsage: function (usageInfo) {
				console.log(usageInfo.message)
			}
		}),
    ]
	return gulp
		.src(config.paths.entry.allcss)
		.pipe(postcss(plugins))
}
exports.cssSupport = cssSupport

//все полностью собираем
exports.build = gulp.parallel(css)

//задачи по умолчанию при запуске галпа
exports.default = gulp.parallel(css)
