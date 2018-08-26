const webpackMerge = require('webpack-merge');

const myCustomConfig = {
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
        ]
    }
};

module.exports = {
    webpackPlugins: [],
    modifyWebpack: (config) => webpackMerge(config, myCustomConfig)
};