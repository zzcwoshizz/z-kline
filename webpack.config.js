var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'KLine.js',
        publicPath: '/',
    },
    devServer: {
        publicPath: '/dist',
        host: '0.0.0.0',
        disableHostCheck: true,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
