module.exports = {
  configureWebpack: (config) => {
    config.externals = {
      BMap: 'BMap',
      AMap: 'AMap',
    };
  },
};
