// const path = require('path') // импорт пакетов через CommonJs модули
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack')

// при настроке конфигурации через ts можно использовать ES модули
// import path from 'path'; // не используем тк будем явно передавать в options и не хардкодить
import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';
  return {
    mode: options?.mode ?? 'development',
    entry: options.paths.entry, //path.resolve(__dirname, 'src', 'index.tsx'), // точка входа в файл, м.б. несколько entry: {имя_вых_файла: путь_входа}
    output: {
      path: options.paths.output, //path.resolve(__dirname, 'build'), // название папки выгрузки
      filename: '[name].[contenthash].js', // название выходного файла xчерез шаблонные строки -> name - дефольтное название файла, contenthash - хэш от содержимого файла (если файл меняется то и хэш тоже меняется)
      clean: true, // удаление старых файлов перед каждой сборкой
    },
    plugins: buildPlugins(options),
    module: {
      // в массиве  rules указвается набор лоудеров для обработки файлов в корректном порядке (обрабатываются в соответсвующнем порядке)
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : false, // для отслеживания ошибок в режиме разработки
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
