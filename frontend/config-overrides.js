const BundleTracker = require('webpack-bundle-tracker');
module.exports = {
    webpack: (config, env) => {
        if (env === 'production') {
            config.output.publicPath = '/static/bundles/';

            config.plugins.push(
                new BundleTracker({
                    path: __dirname,
                    filename: 'webpack-stats.prod.json',
                }),
            );
        }
        return config;
    },
    devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.headers = {'Access-Control-Allow-Origin': '*'};
            return config;
        };
    },
};
