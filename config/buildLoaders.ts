import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from './types/types';

// ModuleOptions
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  // не забыть удалить обработку svg из assetLoader тк в этом случае svg будет обработан дважды
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: { // чтобы можно было настраивать цвет иконки через color 
            plugins: [{ name: 'convertColors', params: { currentColor: true } }],
          },
        },
      },
    ],
  };
  /* Без модулей css
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
  */

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  // C css модулями
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // используем один лоудеров (так как в дев режиме не обязательно выносить в отдельный файл стили, то используем обычный style loader)
      // Translates CSS into CommonJS
      cssLoaderWithModules,
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
    use: {
      // если бы мы не использовали ts-loader, то нужно было бы использовать babel-loader для работы с jsx
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
        transpileOnly: true, // только транспилировать  ts файлы без проверки типов для оптимизации
      },
    },
    exclude: /node_modules/,
  };
  

  return [
    // в массиве указвается набор лоудеров для обработки файлов в корректном порядке (обрабатываются в соответсвующнем порядке)
    //Порядок важен, так на выходе получаем обработанные файлы
    assetLoader,
    scssLoader,
    //styleLoader, // style loader можно убрать, так как правила обрпботки css уже прописаны выше для sass файлов
    tsLoader,
    svgLoader,
  ];
}
