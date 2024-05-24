# esbuild-bundle-analyzer GitHub Action

[![test](https://github.com/exoego/esbuild-bundle-analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/exoego/esbuild-bundle-analyzer/actions/workflows/ci.yml)

Analyzes each PR's impact on esbuild bundle size

![comment-example](/doc/comment.png "Comment Example")

## Usage

### GitHub Action setup

```yaml
permissions:
  contents: read # for checkout repository
  actions: read # for fetching base branch bundle stats
  pull-requests: write # for comments
  issues: write # for comments

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
    # ... 
    # (snip)
    # ... 
    # Ensure you build your project before running this action
    - name: Run esbuild
      run: npm run build
    
    # Call this action after the build
    - name: Analyze esbuild bundle size
      # uses: exoego/esbuild-bundle-analyzer@main # If you prefer nightly!
      uses: exoego/esbuild-bundle-analyzer@v1
      with:
        metafiles: "out/meta.json"
```

### esbuild setup

You need to [write ***meta file*** yourself after build](https://esbuild.github.io/api/#metafile).

If you use esbuild CLI, your build script in package.json should have `--metafile=out/meta.json` or such, something like this:

```json5
{
  "scripts": {
    "build": "esbuild ./src/lambda.ts --bundle --metafile=out/meta.json ......."
  },
  // ...
}
```

If you use esbuild API, something like this:

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

For both cases, the `metafiles` input for GitHub Action will be `"dist/meta.json"`.

If you have multiple meta files, you can specify them like this `"dist/meta1.json,dist/meta2.json"` or `"dist/meta*.json`.

## Permissions

This action requires the following permissions:

```yaml
permissions:
  contents: read # for checkout repository
  actions: read # for fetching base branch bundle stats
  pull-requests: write # for comments
  issues: write # for comments
```

## Action inputs

| Name                      | Default                               | Description                                                                                                      |
|---------------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `metafiles`               | -                                     | A required comma-separated list of paths to [esbuild's meta file]([https://esbuild.github.io/api/#metafile]). Glob (`dist/**/meta.json`) is supported. |
| `name`                    | ${{ github.event.<br>repository.name }} | The name of your project. This will be used in the comment header.                                             |
| `analyze_directory`       | `.analyzer`                           | A path to working directory where bundle analysis are stored.                                                    |
| `include_extensions`      | `.js,.cjs,.mjs`                       | A comma-separated list of file extension to be included in the analysis table.                                   |
| `percent_extra_attention` | `20`                                  | If an out file size has increased more than this percent, display a "‼️" to draw extra attention to the change.  |
| `show_details`            | `true`                                | If `true`, a collapsed "details" section is rendered. It explains the details of the numbers provided and icons. |
| `top_n_largest_paths`     | `20`                                  | The number of largest paths (e.g.) `node_modules/foo`) to be collected. If 0 or lower, skipped.                  |

## Action outputs

No outputs are provided by this action at this time.

## Acknowledgements

- Highly inspired by [hashicorp/nextjs-bundle-analysis](https://github.com/hashicorp/nextjs-bundle-analysis)

## License

[MIT](LICENSE)
