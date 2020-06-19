module.exports = {
  webpack: (config /*, options, webpack*/) => {
    config.plugins.splice(1, 1); // remove the BannerPlugin, remove this line after https://github.com/jaredpalmer/backpack/issues/124 is fixed
    return config;
  }
};
