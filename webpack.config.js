const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, "dist"),
        filename: "index_bundle.js",
    },
    devtool: 'source-map',
    devServer: {
        proxy: {
            '/api/**': {
                target: 'http://localhost:8080/',
                secure: false,
                changeOrigin: true
            }
        },
        // Use 'static' instead of 'contentBase'
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        // Ensure hot module replacement is enabled
        hot: true,
        port: 3000,
        open: true,
    },

    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
