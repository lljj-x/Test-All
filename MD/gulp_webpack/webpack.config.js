module.exports = {
    entry: "./app/src/js/entry.js",
    output: {
        path: path.join(__dirname, "app/scripts"),
        filename: "main.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            // required for react jsx
            { test: /\.js$/,	loader: "jsx-loader" }
        ]
    }
};
