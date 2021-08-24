module.exports = {
    devServer: {
        proxy: 'http://localhost:5000',
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/assets/styles/_variables.sass"
                    @import "@/assets/styles/_global.sass"
                `
            }
        }
    }
}