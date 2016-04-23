module.exports = {
	entry: "./main.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel', // 'babel-loader' is also a legal name to reference
			query: {
			presets: ['react', 'es2015']
			}
		}, {
            test:   /\.css$/,
            loader: "style-loader!css-loader?-url!postcss-loader"
		},/*{
        	test: /\.((png)|(eot)|(woff)|(ttf)|(svg)|(gif))$/,
        	loader: 'file?name=/[hash].[ext]'
      	} /*{
			test: /\.svg$/,
			loader: "svg-inline-loader"
		}*/]
	},
	externals: {
		"jsdom": "window"
	},
	postcss: function () {
        return [require('autoprefixer'), require('precss')];
    }
}