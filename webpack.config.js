const path = require('path')

module.exports = (env) => ({
  mode: env.mode ?? 'development', 
  entry: path.resolve(__dirname, 'src', 'index.js'), // точка входа в файл, м.б. несколько entry: {имя_вых_файла: путь_входа}
  output: {
    path: path.resolve(__dirname, 'build'), // название папки выгрузки
    filename: '[name].[contenthash].js' , // название выходного файла xчерез шаблонные строки -> name - дефольтное название файла, contenthash - хэш от содержимого файла (если файл меняется то и хэш тоже меняется)
    clean: true, // удаление старых файлов перед каждой сборкой 
  }
})