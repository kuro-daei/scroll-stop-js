const path = require('path');
const webpack = require('webpack');
const defineProduction = new webpack.DefinePlugin({__PRERELEASE__: 'true'});
const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {warnings: false},
  output: {comments: false}
});

const babel = {
  test: /\.js$/,
  include: [path.resolve(__dirname, 'src')],
  loader: 'babel-loader',
  query: {presets: ['es2015']}
};

var configs = {
  "production": {
    entry: {"dist/dac-ivt-production.js": './src/dac-ivt-controller.js'},
    output: { filename: "[name]" },
    plugins: [ uglify, defineProduction ],
    module: { loaders: [ babel ] },
  },
  "staging": {
    entry: {"demo/dac-ivt-staging.js": './src/dac-ivt-controller.js'},
    output: { filename: "[name]" },
    devtool: 'source-map',
    plugins: [ uglify  ],
    module: { loaders: [ babel ] },
  },
  "develop":{
    entry: {"demo/dac-scroll-stop-development.js": './src/main.js'},
    output: { filename: "[name]" },
    devtool: 'source-map',
    plugins: [ ],
    module: { loaders: [ babel ] },
  }
};

var env = process.env.NODE_ENV || 'develop';
console.log('build env:' + env);

module.exports = configs[env];
