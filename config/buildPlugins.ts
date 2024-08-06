import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: options.paths.html }), // плагин для работы с html, обязательно создаем новый экземляр класса плагина. Если не указвать template, создаться дефолтный html файл
  ];

  if (isDev) {
    plugins.push(new ProgressPlugin()); // показывает процесс сборки
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    ); //выносит css в отдельный файл
    if(options.analyzer) plugins.push(new BundleAnalyzerPlugin)
  }

  return plugins;
}
