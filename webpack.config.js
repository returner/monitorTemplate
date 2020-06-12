var webpack = require('webpack');
const path = require('path');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        entry: './app/app.ts',
        output : {
            filename : 'bundle.js',
            path : path.resolve(__dirname, './wwwroot'),
            publicPath : "/"
        },
        mode : "development",
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, './wwwroot'),
            publicPath: path.resolve(__dirname, '/wwwroot/'),
            hot: true,
            port : 9898
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                }
            ]
        },
        
        
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        }
    };

    //if (options.mode === 'development') {
        config.output.path = path.resolve(__dirname, './wwwroot');
    //} else {
    //    //production
    //    config.output.path = path.resolve(__dirname, './docs/dist');
    //    config.plugins = [
    //        new CopyWebpackPlugin([{ from: './index.html', to: '../' }]),
    //    ];
        //config.optimization = {
        //    minimizer: [
        //        new UglifyJsPlugin({
        //            cache: true,
        //            parallel: true,
        //            uglifyOptions: {
        //                compress: true,
        //                ecma: 5,
        //                mangle: true
        //            },
        //            sourceMap: true
        //        })
        //    ]
        //}
    //}

    return config;
};
