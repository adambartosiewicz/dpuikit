var ExtractTextPlugin = require('extract-text-webpack-plugin'),
	webpack = require('webpack'),
	config = {
		isProd: void 0 !== process.env.NODE_ENV && 'production' === process.env.NODE_ENV,
		main_dirname: __dirname + '/assets/js/'
	},
	webpackConfig = {};

webpackConfig.entry = {
	main: config.main_dirname + 'main.js'
};

webpackConfig.devtool = config.isProd ? '#' : 'source-map';

webpackConfig.output = {
	path: __dirname + '/public/dest/js/',
	filename: '[name].js'
};

webpackConfig.module = {
	loaders: [
		{
			test: /\.scss/,
			loader: ExtractTextPlugin.extract('style-loader', config.isProd ? 'css-loader?minimize!sass-loader' : 'css-loader?sourceMap!sass-loader?sourceMap'),
			include: __dirname + '/assets/css/'
		}
	]
};


webpackConfig.plugins = [
	new ExtractTextPlugin('../css/[name].css')
];

if (true === config.isProd) {
	webpackConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			},
			mangle: {
				except: ['$super', '$', 'exports', 'require']
			}
		}, new webpack.optimize.OccurrenceOrderPlugin())
	);
}

module.exports = webpackConfig;