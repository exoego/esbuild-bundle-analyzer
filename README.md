# esbuild-bundle-analyzer GitHub Action

[![test](https://github.com/exoego/esbuild-bundle-analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/exoego/esbuild-bundle-analyzer/actions/workflows/ci.yml)

Analyzes each PR's impact on esbuild bundle size

![comment-example](/doc/comment.png "Comment Example")

## Usage

### GitHub Action setup for 🔐private repositories

```yaml
name: esbuild-bundle-analyzer

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      contents: read # for checkout repository
      actions: read # for fetching base branch bundle stats
      pull-requests: write # for comments
    steps:
    # Ensure you build your project before running this action
    # For example,
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'
        cache-dependency-path: subdir/package-lock.json
    - run: npm ci
    - name: Run esbuild
      run: npm run build
    
    # Call this action after the build
    - name: Analyze esbuild bundle size
      # uses: exoego/esbuild-bundle-analyzer@main # If you prefer nightly!
      uses: exoego/esbuild-bundle-analyzer@v1
      with:
        metafiles: "out/meta.json"
```


### GitHub Action setup for public repositories

If your repository is public and you want to run this action on PRs from forks, you may need to use `pull_request_target` event.
By using `pull_request_target` event, GitHub grant GitHub Actions to modify pull requests even on PRs from forks.

> [!WARNING]
> Please refer [Permissions for the GITHUB_TOKEN](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) and use this carefully.

```yaml
name: esbuild-bundle-analyzer

on:
  push:
    branches: [main]
  pull_request_target:
    branches: [main]

jobs:
  # PLEASE AVOID ADDING OTHER JOBS IN THIS FILE
  # BECAUSE THIS ACTION USE `pull_request_target` EVENT that grants write permissions to GitHub Actions running on PRs from forks.
  analyze:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      contents: read # for checkout repository
      actions: read # for fetching base branch bundle stats
      pull-requests: write # for comments    
    steps:
    # Ensure you build your project before running this action
    # For example,
    - uses: actions/checkout@v4
      with:
        # This is required to fetch the commit SHA of the forked PR
        ref: "${{ github.event.pull_request.merge_commit_sha }}"
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'
        cache-dependency-path: subdir/package-lock.json
    - run: npm ci
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
```

This action uses the `GITHUB_TOKEN` provided by GitHub Actions.
Due to security limitation, `GITHUB_TOKEN` is not granted to write comments on PRs from forks on `pull_request` event.
Instead, [`pull_request_target` event should be used on PRs from forks to overcome this limitation](https://docs.github.com/en/actions/security-guides/automatic-token-authentication).
Please check the above setup example to use this action with `pull_request_target`.

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
