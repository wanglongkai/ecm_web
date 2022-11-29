const WebpackShellPlugin = require('webpack-shell-plugin-next');
const TerserPlugin = require("terser-webpack-plugin");
const tar = require('tar');
const path = require('path');
const fs = require('fs');

module.exports = {
    webpack: {
        output: {
            path: path.resolve(__dirname, '../dist'),
        },
        configure: (webpackConfig, { env, paths }) => {
            paths.appBuild = 'dist';
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, '../dist'),
                filename: 'routes/[name].[hash:8].js',
                chunkFilename: 'chunks/[name].[chunkhash:8].js',
                publicPath: '/'
            }
            webpackConfig.devtool = false; // 去除生产环境的.map文件
            webpackConfig.optimization.minimizer = [
                new TerserPlugin({
                  parallel: true, //开启并行压缩，可以加快构建速度
                  extractComments: false, // 去除生产环境的.LICENSE.txt文件
                }),
              ];
            return webpackConfig;
        },
        plugins: {
            add: [ 
                new WebpackShellPlugin({
                    onBuildExit: {
                        scripts: [() => {
                            tar.c({
                                gzip: true,
                                cwd: path.resolve(__dirname, '../dist/'),
                                file: path.resolve(__dirname, '../dist/ecm_web.tar.gz'),
                                sync: true
                            },
                            [...fs.readdirSync(path.resolve(__dirname, '../dist/'))]
                            )                            
                        }],
                        blocking: true,
                        parallel: false
                    }
                })
            ]
        },
    }
};