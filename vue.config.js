// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  publicPath: "/admin",
  devServer: {
    port: 3000, // Specify a port number to listen for requests on:
    disableHostCheck: true,
    hotOnly: true,
    hot: true,
    transportMode: "ws",
    progress: false,
    proxy: {
      "/api": {
        target: "http://mtk-btb.test.local/",
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ["vuetify", "@netex/admin"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "src/assets/scss/variables.scss";
        `,
      },
    },
  },
};
