// from https://dev.to/coorasse/the-progressive-rails-app-46ma
const { resolve } = require('path');
const { config, environment, Environment } = require('@rails/webpacker');
// const { environment } = require('@rails/webpacker')
// from https://dev.to/coorasse/the-progressive-rails-app-46ma
const WebpackerPwa = require('webpacker-pwa');
new WebpackerPwa(config, environment);

const webpack = require('webpack');
// Preventing Babel from transpiling NodeModules packages
environment.loaders.delete('nodeModules');
// Bootstrap 4 has a dependency over jQuery & Popper.js:
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
);


module.exports = environment
