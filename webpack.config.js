const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = {
    mode: "production",
    entry: path.join(__dirname, "./src/index.ts"),
    output: {
        filename: "index.min.js",
        path: path.join(__dirname, "./public")
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new WebpackObfuscator({
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: true,
            debugProtectionInterval: true,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayThreshold: 0.75,
            unicodeEscapeSequence: true
        })
    ]
}