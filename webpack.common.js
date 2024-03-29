const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BrotliPlugin = require('brotli-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

module.exports = {  
    // Entry point for Webpack  
    entry: './src/index.tsx',

    plugins: [
        // Plugin to use HTML file for serving bundled js files 
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // Analyse compiled bundle
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            generateStatsFile: true,
            statsOptions: { source: false }
        }),
        new BrotliPlugin({
            asset: '[file].br',
            test: /\.(js)$/
        }),
        // Only support 'en' locale for Moment.js library's date formatting
        new MomentLocalesPlugin(),
        // Only support 'GB' time zone since 1991 for Moment.js library
        new MomentTimezoneDataPlugin({
            matchZones: 'GB',
            startYear: 1991,
        })
    ],

    // File path/name used for deploying the bundled file  
    output: {    
        path: path.join(__dirname, '/dist'),    
        filename: 'bundle.js'  
    },

    // Loaders  
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
}