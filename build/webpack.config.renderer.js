const path = require('path')

module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname, '../src/renderer'),
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, '../dist/renderer'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, './tsconfig.renderer.json')
                }
            }
        ]
    },
    externals: [
        (function () {
            const IGNORES = [
                'electron',
                'sqlite3'
            ]

            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, 'require(\'' + request + '\')')
                } else {
                    return callback()
                }
            }
        })()
    ]
}