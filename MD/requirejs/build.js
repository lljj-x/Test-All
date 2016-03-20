({
    appDir: "./js/app",
    baseUrl: "./",
    dir: "./build-js",
    paths: {
        jquery: 'empty:',
        goods:'Goods',
        user:'User',
        other:'other',
        a:'a',
        b:'b'
    },
    //mainConfigFile:'config.js',
    removeCombined:true,
    modules: [
        {
            name: "Main"
        }
    ]
})