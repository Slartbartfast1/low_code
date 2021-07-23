import { defineConfig } from 'umi';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
export default defineConfig({
  chainWebpack(config, { env, webpack, createCSSRule }) {
    config
      .plugin('monaco')
      .use(new MonacoWebpackPlugin({
        languages: ['javascript','typescript','react']
      }))
    return config;
  },
  nodeModulesTransform: {
    type: 'none',
  },
  extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],

});
