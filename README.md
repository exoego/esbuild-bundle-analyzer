# esbuild-bundle-analyzer GitHub Action

Analyzes each PR's impact on esbuild bundle size

![comment-example](/doc/comment.png "Comment Example")

## Usage

### Basic

```yaml
# Ensure you build your project before running this action
- name: Run esbuild
  run: npm run build

# Call this action after the build
- name: Analyze esbuild bundle size
  uses: exoego/esbuild-bundle-analyzer@main
  with:
    metafiles: "out/meta.json"
```

As of esbuild v0.20.0, you need to [write
***meta file*** yourself after build](https://esbuild.github.io/api/#metafile), something like this:

```javascript
// esbuild.mjs
import * as esbuild from 'esbuild'
import fs from 'node:fs'

let result = await esbuild.build({
    entryPoints: ['src/app1.ts', 'src/app2.ts'],
    bundle: true,
    metafile: true,
    outdir: 'dist',
})

fs.writeFileSync('dist/meta.json', JSON.stringify(result.metafile))
```

In this case, the `metafiles` input should be `"dist/meta.json"`.

If you have multiple meta files, you can specify them like this `"dist/meta1.json,dist/meta2.json"`.

## Action inputs

| Name                      | Default                               | Description                                                                                                      |
|---------------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `metafiles`               | -                                     | A required comma-separated list of paths to [esbuild's meta file]([https://esbuild.github.io/api/#metafile]).    |
| `name`                    | ${{ github.event.<br>repository.name }} | The name of your project. This will be used in the comment header.                                               |
| `analyze_directory`       | `.analyzer`                           | A path to working directory where bundle analysis are stored.                                                    |
| `percent_extra_attention` | `20`                                  | If an out file size has increased more than this percent, display a "‼️" to draw extra attention to the change.  |
| `show_details`            | `true`                                | If `true`, a collapsed "details" section is rendered. It explains the details of the numbers provided and icons. |

## Action outputs

No outputs are provided by this action at this time.

## Acknowledgements

- Highly inspired by [hashicorp/nextjs-bundle-analysis](https://github.com/hashicorp/nextjs-bundle-analysis)

## License

[MIT](LICENSE)
