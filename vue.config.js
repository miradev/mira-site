// vue.config.js
const path = require('path');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/common/colors.styl'),
      ],
    });
}


module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)));
  },
  configureWebpack: {
    plugins: [
      new GoogleFontsPlugin({
        fonts: [
          { family: 'Open Sans', variants: ['regular', '300', '600', '700'] },
        ],
      }),
    ],
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [],
    },
  },
};
