import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin  from 'copy-webpack-plugin';
import  ForkTsCheckerWebpackPlugin  from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: options.paths.html, favicon: path.resolve(options.paths.public, 'favicon.png') }), // плагин для работы с html, обязательно создаем новый экземляр класса плагина. Если не указвать template, создаться дефолтный html файл
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform), // переменная platform переданная при запуске скрипта будет доступна в приложении как __PLATFORM__
    }),
    
  ];

  if (isDev) {
    plugins.push(new ProgressPlugin()); // показывает процесс сборки
    plugins.push(new ForkTsCheckerWebpackPlugin()); // выносит проверку типов в отдельный процесс
    plugins.push(new ReactRefreshWebpackPlugin()); // для hmr

  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    ); //выносит css в отдельный файл
    if (options.analyzer) plugins.push(new BundleAnalyzerPlugin());
    plugins.push(
      new CopyPlugin({
        // копирует файлы
        patterns: [{ from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales') }],
      })
    );
  }

  return plugins;
}
