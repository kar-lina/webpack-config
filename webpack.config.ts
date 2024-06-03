// const path = require('path') // импорт пакетов через CommonJs модули
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack')

// при настроке конфигурации через ts можно использовать ES модули
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

type Mode = 'production' | 'development'
interface EnvVariables {
  mode: Mode
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'), // точка входа в файл, м.б. несколько entry: {имя_вых_файла: путь_входа}
    output: {
      path: path.resolve(__dirname, 'build'), // название папки выгрузки
      filename: '[name].[contenthash].js', // название выходного файла xчерез шаблонные строки -> name - дефольтное название файла, contenthash - хэш от содержимого файла (если файл меняется то и хэш тоже меняется)
      clean: true, // удаление старых файлов перед каждой сборкой
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }), // плагин для работы с html, обязательно создаем новый экземляр класса плагина. Если не указвать template, создаться дефольтный html файл
      new webpack.ProgressPlugin(), // показывает процесс сборки
    ],
    module: {
      rules: [
        // в массиве указвается набор лоудеров для обработки файлов в корректном порядке (обрабатываются в соответсвующнем порядке)
        {
          test: /\.tsx?$/, // обраьотка только ts / tsx файлов
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'], // указываем файлы, в которых хранится  исходный код эппlkа
      modules: ['src', 'node_modules'], // Assuming that your files are inside the src dir
    },
  };

  return config;
};
