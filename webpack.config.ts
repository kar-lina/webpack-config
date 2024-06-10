// const path = require('path') // импорт пакетов через CommonJs модули
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack')

// при настроке конфигурации через ts можно использовать ES модули
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const devServer: DevServerConfiguration = {};
type Mode = 'production' | 'development'
interface EnvVariables {
  mode: Mode
  port: number
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development' 
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'), // точка входа в файл, м.б. несколько entry: {имя_вых_файла: путь_входа}
    output: {
      path: path.resolve(__dirname, 'build'), // название папки выгрузки
      filename: '[name].[contenthash].js', // название выходного файла xчерез шаблонные строки -> name - дефольтное название файла, contenthash - хэш от содержимого файла (если файл меняется то и хэш тоже меняется)
      clean: true, // удаление старых файлов перед каждой сборкой
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }), // плагин для работы с html, обязательно создаем новый экземляр класса плагина. Если не указвать template, создаться дефолтный html файл
      isDev && new webpack.ProgressPlugin(), // показывает процесс сборки
      !isDev && new MiniCssExtractPlugin({   
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }), //выносит css в отдельный файл
    ].filter(Boolean),
    module: {
      rules: [
        // в массиве указвается набор лоудеров для обработки файлов в корректном порядке (обрабатываются в соответсвующнем порядке)
        //Порядок важен, так на выходе получаем обработанные файлы

        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // используем один лоудеров (так как в дев режиме не обязательно выносить в отдельный файл стили, то используем обычный style loader)
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        // { // можно убрать, так как правила обрпботки css уже прописаны выше для sass файлов
        //   test: /\.css$/i,
        //   use: ['style-loader', 'css-loader'], // обработка css файлов
        // },
        {
          test: /\.tsx?$/, // обраьотка только ts / tsx файлов
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'], // указываем файлы, в которых хранится  исходный код эпп
      modules: ['src', 'node_modules'], // Assuming that your files are inside the src dir
    },
    devtool: isDev ? 'inline-source-map' : false, // для отслеживания ошибок в режиме разработки
    devServer: isDev
      ? {
          static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          port: env.port ?? 9000,
        }
      : undefined,
  };

  return config;
};
