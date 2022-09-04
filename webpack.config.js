const path = require('path')
const Dotenv = require('dotenv-webpack');
const fs = require('fs')
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
        },{
            test: /\.css$/,
            use: [
                'style-loader', 
                'css-loader',
            ],
            exclude: '/node_modules/'
        }]
    },
    plugins: [
        new Dotenv({path: path.join(__dirname, './config/dev.env')})
    ],
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        // contentBase lets devserver know where source files are
        contentBase: path.join(__dirname, 'public'),
        // historyApiFallback allows us to use client side routing
        historyApiFallback: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
};

