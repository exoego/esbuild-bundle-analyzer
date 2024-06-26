import * as esbuild from 'esbuild'
import { readFileSync, writeFileSync } from 'node:fs'

// https://github.com/evanw/esbuild/issues/1685#issuecomment-944916409
const excludeNodeModulesFromSourceMap = {
  name: 'excludeNodeModulesFromSourceMap',
  setup(build) {
    build.onLoad({filter: /node_modules/}, args => {
      if (args.path.endsWith('.js')) {
        return {
          contents:
            readFileSync(args.path, 'utf8') +
            '\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==',
          loader: 'default',
        };
      }
    })
  },
};

const result = await esbuild.build({
  entryPoints: [`./src/index.ts`],
  outfile: `dist/index.mjs`,
  format: 'esm',
  metafile: true,
  minify: true,
  mainFields: ['module', 'main'],
  platform: 'node',
  target: 'node18',
  sourcemap: "inline",
  bundle: true,
  plugins: [excludeNodeModulesFromSourceMap]
})

writeFileSync(`tmp/meta.json`, JSON.stringify(result.metafile, null, 2));
