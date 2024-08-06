import path from "path";
import { buildWebpack } from "./config/buildWebpack";
import { BuildMode, BuildPaths } from "./config/types/types";
interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}
export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };
  return buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer
  });
};
