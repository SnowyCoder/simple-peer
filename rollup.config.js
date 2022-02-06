import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const name = require('./package.json').main.replace(/\.js$/, '');

export default [{
    input: 'src/index.ts',
    output: [
        { file: `dist/${name}.js`, format: 'cjs', sourcemap: true, },
        { file: `dist/${name}.mjs`, format: 'es', sourcemap: true },
    ],
    plugins: [
        typescript(),
    ],
    external: ['buffer', 'eventemitter3'],
}, {
    input: 'src/index.ts',
    output: [
        { file: `dist/${name}.d.ts`, format: 'es', },
    ],
    plugins: [
        typescript(),
        dts(),
    ],
    external: ['buffer', 'eventemitter3'],
}];