import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

// ModuleOptions
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // используем один лоудеров (так как в дев режиме не обязательно выносить в отдельный файл стили, то используем обычный style loader)
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const styleLoader = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'], // обработка css файлов
  };

  const tsLoader = {
    test: /\.tsx?$/, // обработка только ts / tsx файлов
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [
    // в массиве указвается набор лоудеров для обработки файлов в корректном порядке (обрабатываются в соответсвующнем порядке)
    //Порядок важен, так на выходе получаем обработанные файлы
    scssLoader,
    //styleLoader, // style loader можно убрать, так как правила обрпботки css уже прописаны выше для sass файлов
    tsLoader,
  ];
}
