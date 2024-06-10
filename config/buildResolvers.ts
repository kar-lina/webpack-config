import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'], // указываем файлы, в которых хранится  исходный код эпп
    modules: ['src', 'node_modules'], // Assuming that your files are inside the src dir
  };
}
