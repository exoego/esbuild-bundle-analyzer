# esbuild-bundle-analyzer GitHub Action

Analyzes each PR's impact on esbuild bundle size

![comment-example](/doc/comment.png "Comment Example")

## Usage

### 

```yaml
# Ensure you build your project before running this action
- name: Run esbuild
  run: npm run build

- name: Analyze esbuild bundle size
  uses: exoego/esbuild-bundle-analyzer@main
  with:
    metafiles: "out/meta.json"
```

###

## Action inputs

### `metafiles (string)`

(Required) A comma-separated list of paths to [esbuild's meta file]([https://esbuild.github.io/api/#metafile]). Must be non-empty.

As of esbuild v0.20.0, you need to write the meta file by yourself after build, something like this:

```javascript
import * as esbuild from 'esbuild'
import fs from 'node:fs'

let result = await esbuild.build({
  entryPoints: ['src/app1.js', 'src/app2.js'],
  bundle: true,
  metafile: true,
  outdir: 'dist',
})

fs.writeFileSync('dist/meta.json', JSON.stringify(result.metafile))
```

In this case, the `metafiles` config should be `"dist/meta.json"`.

Typically, you only need one meta file since one meta file can contain multiple out files information.
Multiple meta files may be useful for more complex scenarios.

### `analyze_directory (string)`

(Optional, defaults to `.analyzer`) If an out file size has increased more than this percent, display a "‼️" to draw attention
to the change.

### `budget_percent_increase_red (number)`

(Optional, defaults to `20`) If an out file size has increased more than this percent, display a "‼️" to draw attention
to the change.

### `showDetails (boolean)`

(Optional, defaults to `true`) This option renders a collapsed "details" section explaining some of the finer details of
the numbers provided and icons. If you feel like this is not necessary and you and/or those working on your project
understand the details, you can set this option to `false` and that section will not render.

### `skipCommentIfEmpty (boolean)`

(Optional, defaults to `false`) When set to `true`, if no out files have changed size, the generated comment will be an
empty string.

## Action outputs

No outputs are provided by this action at this time.

## Acknowledgements

- Highly inspired by [hashicorp/nextjs-bundle-analysis](https://github.com/hashicorp/nextjs-bundle-analysis)

## License

[MIT](LICENSE.md)
