var glob 			= require('glob')
var webpack 		= require("webpack");

module.exports = {
	// entry: "./test/main.js",
	entry: glob.sync("./test/**/*.test.js"),
	output: {
		path: "test/",
		filename: "test.bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel', // 'babel-loader' is also a legal name to reference
			query: {
				presets: ['react', 'es2015']
			}
		},{
			test: /\.json?$/,
			loader: 'json'
		},{
            test:   /\.css$/,
            loader: "style-loader!css-loader?-url!postcss-loader"
		}]
	},
	postcss: function () {
        return [require('autoprefixer'), require('precss')];
    },
	// plugins: [
	// 	new webpack.BannerPlugin( "import 'source-map-support/register'", {
	// 		raw: true
	// 	})
	// ],
	// plugins: [
 //        new webpack.IgnorePlugin(/jsdom$/)
 //    ],
    target: "node",
	devtool: "source-map"
}