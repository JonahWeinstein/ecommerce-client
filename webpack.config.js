const path = require('path')
// must specify input (app.js) and output
// babel loader allows us to use webpack with babel, the test field uses regex
// to tell webpack that babel should be used on all files ending in '.js' (unless its in the node_modules directory)
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: '/node-modules/'
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // historyApiFallback allows us to use client side routing
        historyApiFallback: true
    }
};
// contentBase lets devserver know where source files are
