// 打包node脚本

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';
const nodeDir = 'node';
const inputFiles = fs
  .readdirSync(nodeDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => ({
    input: `${nodeDir}/${file}`,
    output: {
      file: `lib/${nodeDir}/${file}`,
      format: 'cjs',
      exports: 'auto',
    },
    external: ['fs', 'path', 'node-xlsx', 'https', 'adm-zip'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  }));

export default inputFiles;
