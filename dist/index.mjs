// src/index.ts
import { pathToFileURL } from "node:url";

// src/compare.ts
import fs2 from "node:fs";
import path from "node:path";

// node_modules/filesize/dist/filesize.esm.js
var ARRAY = "array";
var BIT = "bit";
var BITS = "bits";
var BYTE = "byte";
var BYTES = "bytes";
var EMPTY = "";
var EXPONENT = "exponent";
var FUNCTION = "function";
var IEC = "iec";
var INVALID_NUMBER = "Invalid number";
var INVALID_ROUND = "Invalid rounding method";
var JEDEC = "jedec";
var OBJECT = "object";
var PERIOD = ".";
var ROUND = "round";
var S = "s";
var SI = "si";
var SI_KBIT = "kbit";
var SI_KBYTE = "kB";
var SPACE = " ";
var STRING = "string";
var ZERO = "0";
var STRINGS = {
  symbol: {
    iec: {
      bits: ["bit", "Kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"],
      bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    },
    jedec: {
      bits: ["bit", "Kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"],
      bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    }
  },
  fullform: {
    iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
    jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
  }
};
function filesize(arg, {
  bits = false,
  pad = false,
  base = -1,
  round = 2,
  locale = EMPTY,
  localeOptions = {},
  separator = EMPTY,
  spacer = SPACE,
  symbols = {},
  standard = EMPTY,
  output = STRING,
  fullform = false,
  fullforms = [],
  exponent = -1,
  roundingMethod = ROUND,
  precision = 0
} = {}) {
  let e = exponent, num = Number(arg), result = [], val = 0, u = EMPTY;
  if (standard === SI) {
    base = 10;
    standard = JEDEC;
  } else if (standard === IEC || standard === JEDEC) {
    base = 2;
  } else if (base === 2) {
    standard = IEC;
  } else {
    base = 10;
    standard = JEDEC;
  }
  const ceil = base === 10 ? 1e3 : 1024, full = fullform === true, neg = num < 0, roundingFunc = Math[roundingMethod];
  if (typeof arg !== "bigint" && isNaN(arg)) {
    throw new TypeError(INVALID_NUMBER);
  }
  if (typeof roundingFunc !== FUNCTION) {
    throw new TypeError(INVALID_ROUND);
  }
  if (neg) {
    num = -num;
  }
  if (e === -1 || isNaN(e)) {
    e = Math.floor(Math.log(num) / Math.log(ceil));
    if (e < 0) {
      e = 0;
    }
  }
  if (e > 8) {
    if (precision > 0) {
      precision += 8 - e;
    }
    e = 8;
  }
  if (output === EXPONENT) {
    return e;
  }
  if (num === 0) {
    result[0] = 0;
    u = result[1] = STRINGS.symbol[standard][bits ? BITS : BYTES][e];
  } else {
    val = num / (base === 2 ? Math.pow(2, e * 10) : Math.pow(1e3, e));
    if (bits) {
      val = val * 8;
      if (val >= ceil && e < 8) {
        val = val / ceil;
        e++;
      }
    }
    const p = Math.pow(10, e > 0 ? round : 0);
    result[0] = roundingFunc(val * p) / p;
    if (result[0] === ceil && e < 8 && exponent === -1) {
      result[0] = 1;
      e++;
    }
    u = result[1] = base === 10 && e === 1 ? bits ? SI_KBIT : SI_KBYTE : STRINGS.symbol[standard][bits ? BITS : BYTES][e];
  }
  if (neg) {
    result[0] = -result[0];
  }
  if (precision > 0) {
    result[0] = result[0].toPrecision(precision);
  }
  result[1] = symbols[result[1]] || result[1];
  if (locale === true) {
    result[0] = result[0].toLocaleString();
  } else if (locale.length > 0) {
    result[0] = result[0].toLocaleString(locale, localeOptions);
  } else if (separator.length > 0) {
    result[0] = result[0].toString().replace(PERIOD, separator);
  }
  if (pad && Number.isInteger(result[0]) === false && round > 0) {
    const x = separator || PERIOD, tmp = result[0].toString().split(x), s = tmp[1] || EMPTY, l = s.length, n = round - l;
    result[0] = `${tmp[0]}${x}${s.padEnd(l + n, ZERO)}`;
  }
  if (full) {
    result[1] = fullforms[e] ? fullforms[e] : STRINGS.fullform[standard][e] + (bits ? BIT : BYTE) + (result[0] === 1 ? EMPTY : S);
  }
  return output === ARRAY ? result : output === OBJECT ? {
    value: result[0],
    symbol: result[1],
    exponent: e,
    unit: u
  } : result.join(spacer);
}

// src/utils.ts
import fs from "node:fs";
function loadJsonFile(path3) {
  return JSON.parse(fs.readFileSync(path3).toString("utf-8"));
}
function loadMetaFile(path3) {
  return loadJsonFile(path3);
}
function loadAnalysisJson(path3) {
  return loadJsonFile(path3);
}
function getInput(name) {
  const val = process.env[`INPUT_${name.toUpperCase()}`] || "";
  return val.trim();
}

// src/compare.ts
function buildTree(input) {
  const root = { name: "", path: "", value: 0, children: [] };
  for (const [filePath, { bytesInOutput }] of Object.entries(input)) {
    const directories = filePath.split("/");
    buildNode(root, directories, bytesInOutput);
  }
  return root;
}
function buildNode(node, paths, value) {
  const first = paths.shift();
  if (first === void 0) {
    node.value += value;
    return;
  }
  let child = node.children.find((child2) => child2.name === first);
  if (!child) {
    child = {
      name: first,
      path: `${node.path}/${first}`.replace(/^\//, ""),
      value: 0,
      children: []
    };
    node.children.push(child);
  }
  node.value += value;
  buildNode(child, paths, value);
}
function compare(input) {
  let hasAnyChange = false;
  let output = `## \u{1F4E6} esbuild Bundle Analysis for ${input.name}

This analysis was generated by [esbuild-bundle-analyzer](https://github.com/exoego/esbuild-bundle-analyzer). \u{1F916}
`;
  const current = loadAnalysisJson(
    path.join(process.cwd(), input.analyzerDirectory, "bundle_analysis.json")
  );
  let base;
  try {
    base = loadAnalysisJson(
      path.join(
        process.cwd(),
        input.analyzerDirectory,
        "base/bundle/bundle_analysis.json"
      )
    );
  } catch (e) {
    base = {};
  }
  const trees = /* @__PURE__ */ new Map();
  for (const metafileRelPath of input.metafiles) {
    const metafile = loadMetaFile(path.join(process.cwd(), metafileRelPath));
    for (const [outfile, buildMeta] of Object.entries(metafile.outputs)) {
      const tree = buildTree(buildMeta.inputs);
      trees.set(`${metafileRelPath} -> ${outfile}`, tree);
      fs2.writeFileSync(
        path.join(process.cwd(), input.analyzerDirectory, "tree.json"),
        JSON.stringify(tree, null, 2)
      );
    }
  }
  const allOutFiles = [
    .../* @__PURE__ */ new Set([...Object.keys(current), ...Object.keys(base)])
  ].sort();
  const comparison = allOutFiles.map((outfile) => {
    const currentStats = current[outfile];
    const baseStats = base[outfile];
    if (!currentStats) {
      hasAnyChange = true;
      return { ...baseStats, diff: -1, remark: "deleted", tree: void 0 };
    }
    const tree = trees.get(
      `${currentStats.metafile} -> ${currentStats.outfile}`
    );
    if (!baseStats) {
      hasAnyChange = true;
      return { ...currentStats, diff: -1, remark: "added", tree };
    }
    const diff = currentStats.bytes - baseStats.bytes;
    const increase = !!Math.sign(diff);
    if (diff !== 0) {
      hasAnyChange = true;
    }
    return {
      ...currentStats,
      diff,
      tree,
      remark: increase ? "increased" : "decreased"
    };
  });
  if (hasAnyChange) {
    output += markdownTable(comparison, input.percentExtraAttention);
    output += fileSizeTable(comparison);
    if (input.showDetails) {
      output += `
<details>
<summary>Details</summary>
<p>Next to the size is how much the size has increased or decreased compared with the base branch of this PR.</p>
<ul>
<li>\u203C\uFE0F: Size increased by ${input.percentExtraAttention}% or more. Special attention should be given to this.</li>
<li>\u26A0\uFE0F: Size increased in acceptable range (lower than ${input.percentExtraAttention}%).</li>
<li>\u2705: No change or even downsized.</li>
<li>\u{1F5D1}\uFE0F: The out file is deleted: not found in base branch.</li>
<li>\u{1F195}: The out file is newly found: will be added to base branch.</li>
</ul>
</details>
`;
    }
  } else {
    output += "This PR introduced no changes to the esbuild bundle! \u{1F64C}";
  }
  output += `<!-- __ESBUILD_BUNDLE_${input.name} -->`;
  fs2.mkdirSync(path.join(process.cwd(), input.analyzerDirectory), {
    recursive: true
  });
  fs2.writeFileSync(
    path.join(
      process.cwd(),
      input.analyzerDirectory,
      "bundle_analysis_comment.txt"
    ),
    output.trim()
  );
}
function filesize2(bytes) {
  return filesize(bytes, {
    spacer: "\xA0"
  });
}
function markdownTable(data, redThreshold) {
  const rows = data.map((d) => {
    return `${d.metafile} | ${d.outfile} | ${renderSize(d)} | ${renderNote(
      d,
      redThreshold
    )}
`;
  }).join("");
  return `
Meta File | Out File  | Size (raw) | Note 
----------|----------|-----------:|------
${rows}`;
}
function findLargeDirectories(root) {
  const nodes = [];
  const queue = [
    { node: root, depth: 0 }
  ];
  while (queue.length > 0) {
    const shift = queue.shift();
    if (!shift) {
      break;
    }
    const { node, depth } = shift;
    if (depth === 3) {
      nodes.push(node);
      continue;
    }
    if (node.children.length === 0) {
      nodes.push(node);
    } else {
      for (const item of node.children) {
        queue.push({ node: item, depth: depth + 1 });
      }
    }
  }
  const largeNodes = nodes.sort((a, b) => b.value - a.value).slice(0, 10);
  return {
    largeNodes,
    hasOther: nodes.length > 10
  };
}
function fixedPercent(n, d) {
  return Number.parseFloat((n / d * 100).toFixed(1));
}
function fileSizeTable(data) {
  if (data.length === 0) {
    return "";
  }
  let output = "";
  output += "<details>\n";
  output += "<summary>Top ten largest paths</summary>\n";
  for (const d of data) {
    output += "\n";
    output += `## Meta file: ${d.metafile}, Out file: ${d.outfile}
`;
    if (!d.tree) {
      output += "\uFE0F\uFE0F\u{1F5D1}\uFE0FDeleted\n";
      continue;
    }
    output += "| Path | Size |\n";
    output += "|------|-------|\n";
    const totalSize = d.tree.value;
    const { largeNodes, hasOther } = findLargeDirectories(d.tree);
    for (const { path: path3, value } of largeNodes) {
      const percent = fixedPercent(value, totalSize);
      output += `| ${path3} | ${renderBar(percent, value)} |
`;
    }
    if (hasOther) {
      const otherSize = totalSize - largeNodes[0].value;
      const otherPercent = fixedPercent(otherSize, totalSize);
      output += `| (other) | ${renderBar(otherPercent, otherSize)} |
`;
    }
  }
  output += "</details>\n";
  return output;
}
function renderBar(percent, bytes) {
  const bar = progress(percent / 100);
  return `\${{\\color{Goldenrod}{ ${bar} }}}$ ${percent.toFixed(
    1
  )}%, ${filesize2(bytes)}`;
}
var blocks = ["", "\u258F", "\u258E", "\u258D", "\u258C", "\u258B", "\u258A", "\u2589", "\u2588"];
var progression = 1 / (blocks.length - 1);
function progress(value, length = 25, vmin = 0, vmax = 1) {
  const v = value * length;
  const integerPart = Math.floor(v);
  const fractionalPart = v - integerPart;
  const i = Math.round(
    progression * Math.floor(fractionalPart / progression) / progression
  );
  return "\u2588".repeat(integerPart) + blocks[i];
}
function renderSize(d) {
  return filesize2(d.bytes);
}
function renderNote(d, redThreshold) {
  if (d.remark === "deleted") {
    return "\u{1F5D1}\uFE0F Deleted";
  }
  if (d.remark === "added") {
    return "\u{1F195} Added";
  }
  if (d.diff) {
    const percentChange = d.diff / d.bytes * 100;
    return `${renderStatusIndicator(percentChange, redThreshold)}${filesize2(
      d.diff
    )} (${sign(percentChange)}${percentChange.toFixed(1)}%)`;
  }
  return "\u2705  No change";
}
function sign(num) {
  return num < 0 ? "" : "+";
}
function renderStatusIndicator(percentChange, redThreshold) {
  let res;
  if (percentChange > 0 && percentChange < redThreshold) {
    res = "\u26A0\uFE0F";
  } else if (percentChange >= redThreshold) {
    res = "\u203C\uFE0F";
  } else {
    res = "\u2705 ";
  }
  return `${res} ${sign(percentChange)}`;
}

// src/report.ts
import fs3 from "node:fs";
import path2 from "node:path";
import process2 from "node:process";
function report(input) {
  const allPageSizes = getAllPageSizes(input);
  fs3.mkdirSync(path2.join(process2.cwd(), input.analyzerDirectory), {
    recursive: true
  });
  const resultJsonPath = path2.join(
    process2.cwd(),
    input.analyzerDirectory,
    "bundle_analysis.json"
  );
  fs3.writeFileSync(resultJsonPath, JSON.stringify(allPageSizes, null, 2));
  console.log(`Wrote ${resultJsonPath}`);
}
function getAllPageSizes(input) {
  const acc = {};
  return input.metafiles.reduce((acc2, metafile) => {
    const metaFilePath = path2.join(process2.cwd(), metafile);
    try {
      fs3.accessSync(metaFilePath, fs3.constants.R_OK);
    } catch (err) {
      console.error(
        `No meta file found at "${metaFilePath}" - a path to meta file may be wrong, or esbuild is not executed.`
      );
      process2.exit(1);
    }
    const metaFileJson = loadMetaFile(metaFilePath);
    Object.entries(metaFileJson.outputs).reduce((acc3, output) => {
      const [outfile, buildMeta] = output;
      if (!input.includeExtensions.some(
        (ext) => outfile.toLowerCase().endsWith(ext)
      )) {
        return acc3;
      }
      acc3[`${metafile} -> ${outfile}`] = {
        bytes: buildMeta.bytes,
        metafile,
        outfile
      };
      return acc3;
    }, acc2);
    return acc2;
  }, acc);
}

// src/index.ts
function getOptions() {
  const rawMetafiles = getInput("metafiles");
  if (!rawMetafiles) {
    throw new Error("metafiles is not specified");
  }
  const name = getInput("name");
  if (!name) {
    throw new Error("name is not specified");
  }
  return {
    percentExtraAttention: Number.parseInt(
      getInput("percent_extra_attention") || "20",
      10
    ),
    showDetails: ["true", "True", "TRUE"].includes(
      getInput("show_details") || "true"
    ),
    includeExtensions: (getInput("include_extensions") || ".js,.mjs,.cjs").split(","),
    name,
    analyzerDirectory: getInput("analyze_directory") || ".analyzer",
    metafiles: rawMetafiles.split(",")
  };
}
function run(options = getOptions()) {
  report(options);
  compare(options);
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
export {
  run
};
/*! Bundled license information:

filesize/dist/filesize.esm.js:
  (**
   * filesize
   *
   * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
   * @license BSD-3-Clause
   * @version 10.1.1
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9jb21wYXJlLnRzIiwgIi4uL3NyYy91dGlscy50cyIsICIuLi9zcmMvcmVwb3J0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBwYXRoVG9GaWxlVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSBcIi4vY29tcGFyZVwiO1xuaW1wb3J0IHsgcmVwb3J0IH0gZnJvbSBcIi4vcmVwb3J0XCI7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2V0SW5wdXQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZXRPcHRpb25zKCk6IE9wdGlvbnMge1xuXHRjb25zdCByYXdNZXRhZmlsZXMgPSBnZXRJbnB1dChcIm1ldGFmaWxlc1wiKTtcblx0aWYgKCFyYXdNZXRhZmlsZXMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJtZXRhZmlsZXMgaXMgbm90IHNwZWNpZmllZFwiKTtcblx0fVxuXHRjb25zdCBuYW1lID0gZ2V0SW5wdXQoXCJuYW1lXCIpO1xuXHRpZiAoIW5hbWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJuYW1lIGlzIG5vdCBzcGVjaWZpZWRcIik7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRwZXJjZW50RXh0cmFBdHRlbnRpb246IE51bWJlci5wYXJzZUludChcblx0XHRcdGdldElucHV0KFwicGVyY2VudF9leHRyYV9hdHRlbnRpb25cIikgfHwgXCIyMFwiLFxuXHRcdFx0MTAsXG5cdFx0KSxcblx0XHRzaG93RGV0YWlsczogW1widHJ1ZVwiLCBcIlRydWVcIiwgXCJUUlVFXCJdLmluY2x1ZGVzKFxuXHRcdFx0Z2V0SW5wdXQoXCJzaG93X2RldGFpbHNcIikgfHwgXCJ0cnVlXCIsXG5cdFx0KSxcblx0XHRpbmNsdWRlRXh0ZW5zaW9uczogKFxuXHRcdFx0Z2V0SW5wdXQoXCJpbmNsdWRlX2V4dGVuc2lvbnNcIikgfHwgXCIuanMsLm1qcywuY2pzXCJcblx0XHQpLnNwbGl0KFwiLFwiKSxcblx0XHRuYW1lLFxuXHRcdGFuYWx5emVyRGlyZWN0b3J5OiBnZXRJbnB1dChcImFuYWx5emVfZGlyZWN0b3J5XCIpIHx8IFwiLmFuYWx5emVyXCIsXG5cdFx0bWV0YWZpbGVzOiByYXdNZXRhZmlsZXMuc3BsaXQoXCIsXCIpLFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKG9wdGlvbnM6IE9wdGlvbnMgPSBnZXRPcHRpb25zKCkpOiB2b2lkIHtcblx0cmVwb3J0KG9wdGlvbnMpO1xuXHRjb21wYXJlKG9wdGlvbnMpO1xufVxuXG5pZiAoaW1wb3J0Lm1ldGEudXJsID09PSBwYXRoVG9GaWxlVVJMKHByb2Nlc3MuYXJndlsxXSkuaHJlZikge1xuXHRydW4oKTtcbn1cbiIsICJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGZpbGVzaXplIGFzIG9yaWdpbmFsRmlsZXNpemUgfSBmcm9tIFwiZmlsZXNpemVcIjtcbmltcG9ydCB0eXBlIHsgQ29tcGFyZVJlc3VsdCwgT3B0aW9ucywgUmVwb3J0LCBUcmVlTWFwTm9kZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBsb2FkQW5hbHlzaXNKc29uLCBsb2FkTWV0YUZpbGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBidWlsZFRyZWUoXG5cdGlucHV0OiBSZWNvcmQ8c3RyaW5nLCB7IGJ5dGVzSW5PdXRwdXQ6IG51bWJlciB9Pixcbik6IFRyZWVNYXBOb2RlIHtcblx0Y29uc3Qgcm9vdDogVHJlZU1hcE5vZGUgPSB7IG5hbWU6IFwiXCIsIHBhdGg6IFwiXCIsIHZhbHVlOiAwLCBjaGlsZHJlbjogW10gfTtcblx0Zm9yIChjb25zdCBbZmlsZVBhdGgsIHsgYnl0ZXNJbk91dHB1dCB9XSBvZiBPYmplY3QuZW50cmllcyhpbnB1dCkpIHtcblx0XHRjb25zdCBkaXJlY3RvcmllcyA9IGZpbGVQYXRoLnNwbGl0KFwiL1wiKTtcblx0XHRidWlsZE5vZGUocm9vdCwgZGlyZWN0b3JpZXMsIGJ5dGVzSW5PdXRwdXQpO1xuXHR9XG5cdHJldHVybiByb290O1xufVxuXG5mdW5jdGlvbiBidWlsZE5vZGUoXG5cdG5vZGU6IFRyZWVNYXBOb2RlLFxuXHRwYXRoczogQXJyYXk8c3RyaW5nPixcblx0dmFsdWU6IG51bWJlcixcbik6IHZvaWQge1xuXHRjb25zdCBmaXJzdCA9IHBhdGhzLnNoaWZ0KCk7XG5cdGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gbGVhZiBub2RlIChmaWxlKVxuXHRcdG5vZGUudmFsdWUgKz0gdmFsdWU7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGxldCBjaGlsZCA9IG5vZGUuY2hpbGRyZW4uZmluZCgoY2hpbGQpID0+IGNoaWxkLm5hbWUgPT09IGZpcnN0KTtcblx0aWYgKCFjaGlsZCkge1xuXHRcdGNoaWxkID0ge1xuXHRcdFx0bmFtZTogZmlyc3QsXG5cdFx0XHRwYXRoOiBgJHtub2RlLnBhdGh9LyR7Zmlyc3R9YC5yZXBsYWNlKC9eXFwvLywgXCJcIiksXG5cdFx0XHR2YWx1ZTogMCxcblx0XHRcdGNoaWxkcmVuOiBbXSxcblx0XHR9O1xuXHRcdG5vZGUuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdH1cblx0bm9kZS52YWx1ZSArPSB2YWx1ZTtcblx0YnVpbGROb2RlKGNoaWxkLCBwYXRocywgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShpbnB1dDogT3B0aW9ucyk6IHZvaWQge1xuXHRsZXQgaGFzQW55Q2hhbmdlID0gZmFsc2U7XG5cdGxldCBvdXRwdXQgPSBgIyMgXHVEODNEXHVEQ0U2IGVzYnVpbGQgQnVuZGxlIEFuYWx5c2lzIGZvciAke2lucHV0Lm5hbWV9XG5cblRoaXMgYW5hbHlzaXMgd2FzIGdlbmVyYXRlZCBieSBbZXNidWlsZC1idW5kbGUtYW5hbHl6ZXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9leG9lZ28vZXNidWlsZC1idW5kbGUtYW5hbHl6ZXIpLiBcdUQ4M0VcdUREMTZcbmA7XG5cblx0Y29uc3QgY3VycmVudCA9IGxvYWRBbmFseXNpc0pzb24oXG5cdFx0cGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGlucHV0LmFuYWx5emVyRGlyZWN0b3J5LCBcImJ1bmRsZV9hbmFseXNpcy5qc29uXCIpLFxuXHQpO1xuXHRsZXQgYmFzZTogUmVwb3J0O1xuXHR0cnkge1xuXHRcdGJhc2UgPSBsb2FkQW5hbHlzaXNKc29uKFxuXHRcdFx0cGF0aC5qb2luKFxuXHRcdFx0XHRwcm9jZXNzLmN3ZCgpLFxuXHRcdFx0XHRpbnB1dC5hbmFseXplckRpcmVjdG9yeSxcblx0XHRcdFx0XCJiYXNlL2J1bmRsZS9idW5kbGVfYW5hbHlzaXMuanNvblwiLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0YmFzZSA9IHt9O1xuXHR9XG5cblx0Y29uc3QgdHJlZXMgPSBuZXcgTWFwPHN0cmluZywgVHJlZU1hcE5vZGU+KCk7XG5cdGZvciAoY29uc3QgbWV0YWZpbGVSZWxQYXRoIG9mIGlucHV0Lm1ldGFmaWxlcykge1xuXHRcdGNvbnN0IG1ldGFmaWxlID0gbG9hZE1ldGFGaWxlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBtZXRhZmlsZVJlbFBhdGgpKTtcblx0XHRmb3IgKGNvbnN0IFtvdXRmaWxlLCBidWlsZE1ldGFdIG9mIE9iamVjdC5lbnRyaWVzKG1ldGFmaWxlLm91dHB1dHMpKSB7XG5cdFx0XHRjb25zdCB0cmVlID0gYnVpbGRUcmVlKGJ1aWxkTWV0YS5pbnB1dHMpO1xuXHRcdFx0dHJlZXMuc2V0KGAke21ldGFmaWxlUmVsUGF0aH0gLT4gJHtvdXRmaWxlfWAsIHRyZWUpO1xuXG5cdFx0XHRmcy53cml0ZUZpbGVTeW5jKFxuXHRcdFx0XHRwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgaW5wdXQuYW5hbHl6ZXJEaXJlY3RvcnksIFwidHJlZS5qc29uXCIpLFxuXHRcdFx0XHRKU09OLnN0cmluZ2lmeSh0cmVlLCBudWxsLCAyKSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYWxsT3V0RmlsZXM6IHN0cmluZ1tdID0gW1xuXHRcdC4uLm5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKGN1cnJlbnQpLCAuLi5PYmplY3Qua2V5cyhiYXNlKV0pLFxuXHRdLnNvcnQoKTtcblxuXHRjb25zdCBjb21wYXJpc29uOiBBcnJheTxDb21wYXJlUmVzdWx0PiA9IGFsbE91dEZpbGVzLm1hcCgob3V0ZmlsZSkgPT4ge1xuXHRcdGNvbnN0IGN1cnJlbnRTdGF0cyA9IGN1cnJlbnRbb3V0ZmlsZV07XG5cdFx0Y29uc3QgYmFzZVN0YXRzID0gYmFzZVtvdXRmaWxlXTtcblxuXHRcdGlmICghY3VycmVudFN0YXRzKSB7XG5cdFx0XHRoYXNBbnlDaGFuZ2UgPSB0cnVlO1xuXHRcdFx0Ly8gZGVsZXRlZCBvdXQgZmlsZVxuXHRcdFx0cmV0dXJuIHsgLi4uYmFzZVN0YXRzLCBkaWZmOiAtMSwgcmVtYXJrOiBcImRlbGV0ZWRcIiwgdHJlZTogdW5kZWZpbmVkIH07XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHJlZSA9IHRyZWVzLmdldChcblx0XHRcdGAke2N1cnJlbnRTdGF0cy5tZXRhZmlsZX0gLT4gJHtjdXJyZW50U3RhdHMub3V0ZmlsZX1gLFxuXHRcdCk7XG5cblx0XHRpZiAoIWJhc2VTdGF0cykge1xuXHRcdFx0aGFzQW55Q2hhbmdlID0gdHJ1ZTtcblx0XHRcdC8vIG5ldyBvdXQgZmlsZVxuXHRcdFx0cmV0dXJuIHsgLi4uY3VycmVudFN0YXRzLCBkaWZmOiAtMSwgcmVtYXJrOiBcImFkZGVkXCIsIHRyZWUgfTtcblx0XHR9XG5cdFx0Y29uc3QgZGlmZiA9IGN1cnJlbnRTdGF0cy5ieXRlcyAtIGJhc2VTdGF0cy5ieXRlcztcblx0XHRjb25zdCBpbmNyZWFzZSA9ICEhTWF0aC5zaWduKGRpZmYpO1xuXHRcdGlmIChkaWZmICE9PSAwKSB7XG5cdFx0XHRoYXNBbnlDaGFuZ2UgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uY3VycmVudFN0YXRzLFxuXHRcdFx0ZGlmZixcblx0XHRcdHRyZWUsXG5cdFx0XHRyZW1hcms6IGluY3JlYXNlID8gXCJpbmNyZWFzZWRcIiA6IFwiZGVjcmVhc2VkXCIsXG5cdFx0fTtcblx0fSk7XG5cblx0aWYgKGhhc0FueUNoYW5nZSkge1xuXHRcdG91dHB1dCArPSBtYXJrZG93blRhYmxlKGNvbXBhcmlzb24sIGlucHV0LnBlcmNlbnRFeHRyYUF0dGVudGlvbik7XG5cdFx0b3V0cHV0ICs9IGZpbGVTaXplVGFibGUoY29tcGFyaXNvbik7XG5cblx0XHRpZiAoaW5wdXQuc2hvd0RldGFpbHMpIHtcblx0XHRcdG91dHB1dCArPSBgXFxuPGRldGFpbHM+XG48c3VtbWFyeT5EZXRhaWxzPC9zdW1tYXJ5PlxuPHA+TmV4dCB0byB0aGUgc2l6ZSBpcyBob3cgbXVjaCB0aGUgc2l6ZSBoYXMgaW5jcmVhc2VkIG9yIGRlY3JlYXNlZCBjb21wYXJlZCB3aXRoIHRoZSBiYXNlIGJyYW5jaCBvZiB0aGlzIFBSLjwvcD5cbjx1bD5cbjxsaT5cdTIwM0NcdUZFMEY6IFNpemUgaW5jcmVhc2VkIGJ5ICR7aW5wdXQucGVyY2VudEV4dHJhQXR0ZW50aW9ufSUgb3IgbW9yZS4gU3BlY2lhbCBhdHRlbnRpb24gc2hvdWxkIGJlIGdpdmVuIHRvIHRoaXMuPC9saT5cbjxsaT5cdTI2QTBcdUZFMEY6IFNpemUgaW5jcmVhc2VkIGluIGFjY2VwdGFibGUgcmFuZ2UgKGxvd2VyIHRoYW4gJHtpbnB1dC5wZXJjZW50RXh0cmFBdHRlbnRpb259JSkuPC9saT5cbjxsaT5cdTI3MDU6IE5vIGNoYW5nZSBvciBldmVuIGRvd25zaXplZC48L2xpPlxuPGxpPlx1RDgzRFx1REREMVx1RkUwRjogVGhlIG91dCBmaWxlIGlzIGRlbGV0ZWQ6IG5vdCBmb3VuZCBpbiBiYXNlIGJyYW5jaC48L2xpPlxuPGxpPlx1RDgzQ1x1REQ5NTogVGhlIG91dCBmaWxlIGlzIG5ld2x5IGZvdW5kOiB3aWxsIGJlIGFkZGVkIHRvIGJhc2UgYnJhbmNoLjwvbGk+XG48L3VsPlxuPC9kZXRhaWxzPlxcbmA7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdG91dHB1dCArPSBcIlRoaXMgUFIgaW50cm9kdWNlZCBubyBjaGFuZ2VzIHRvIHRoZSBlc2J1aWxkIGJ1bmRsZSEgXHVEODNEXHVERTRDXCI7XG5cdH1cblxuXHQvLyB3ZSBhZGQgdGhpcyB0YWcgc28gdGhhdCBvdXIgYWN0aW9uIGNhbiBiZSBhYmxlIHRvIGVhc2lseSBhbmRcblx0Ly8gY29uc2lzdGVudGx5IGZpbmQgdGhlIHJpZ2h0IGNvbW1lbnQgdG8gZWRpdCBhcyBtb3JlIGNvbW1pdHMgYXJlIHB1c2hlZC5cblx0b3V0cHV0ICs9IGA8IS0tIF9fRVNCVUlMRF9CVU5ETEVfJHtpbnB1dC5uYW1lfSAtLT5gO1xuXG5cdC8vIFdyaXRlIHRoZSBvdXRwdXQgdG8gYSBmaWxlIHdoaWNoIGlzIGxhdGVyIHJlYWQgaW5cblx0Ly8gYXMgY29tbWVudCBjb250ZW50cyBieSB0aGUgYWN0aW9ucyB3b3JrZmxvdy5cblx0ZnMubWtkaXJTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBpbnB1dC5hbmFseXplckRpcmVjdG9yeSksIHtcblx0XHRyZWN1cnNpdmU6IHRydWUsXG5cdH0pO1xuXHRmcy53cml0ZUZpbGVTeW5jKFxuXHRcdHBhdGguam9pbihcblx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRpbnB1dC5hbmFseXplckRpcmVjdG9yeSxcblx0XHRcdFwiYnVuZGxlX2FuYWx5c2lzX2NvbW1lbnQudHh0XCIsXG5cdFx0KSxcblx0XHRvdXRwdXQudHJpbSgpLFxuXHQpO1xufVxuXG5mdW5jdGlvbiBmaWxlc2l6ZShieXRlczogbnVtYmVyKTogc3RyaW5nIHtcblx0cmV0dXJuIG9yaWdpbmFsRmlsZXNpemUoYnl0ZXMsIHtcblx0XHRzcGFjZXI6IFwiXHUwMEEwXCIsXG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtYXJrZG93blRhYmxlKFxuXHRkYXRhOiBBcnJheTxDb21wYXJlUmVzdWx0Pixcblx0cmVkVGhyZXNob2xkOiBudW1iZXIsXG4pOiBzdHJpbmcge1xuXHRjb25zdCByb3dzID0gZGF0YVxuXHRcdC5tYXAoKGQpID0+IHtcblx0XHRcdHJldHVybiBgJHtkLm1ldGFmaWxlfSB8ICR7ZC5vdXRmaWxlfSB8ICR7cmVuZGVyU2l6ZShkKX0gfCAke3JlbmRlck5vdGUoXG5cdFx0XHRcdGQsXG5cdFx0XHRcdHJlZFRocmVzaG9sZCxcblx0XHRcdCl9XFxuYDtcblx0XHR9KVxuXHRcdC5qb2luKFwiXCIpO1xuXG5cdHJldHVybiBgXG5NZXRhIEZpbGUgfCBPdXQgRmlsZSAgfCBTaXplIChyYXcpIHwgTm90ZSBcbi0tLS0tLS0tLS18LS0tLS0tLS0tLXwtLS0tLS0tLS0tLTp8LS0tLS0tXG4ke3Jvd3N9YDtcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSB0b3AgdGVuIGxhcmdlc3Qgbm9kZXMgaW4gcm9vdCB0cmVlLlxuICogRGlnIG5vZGVzIHVudGlsIHRoZSBkZXB0aCBvZiAzLlxuICovXG5mdW5jdGlvbiBmaW5kTGFyZ2VEaXJlY3Rvcmllcyhyb290OiBUcmVlTWFwTm9kZSkge1xuXHRjb25zdCBub2RlczogVHJlZU1hcE5vZGVbXSA9IFtdO1xuXHRjb25zdCBxdWV1ZTogQXJyYXk8eyBub2RlOiBUcmVlTWFwTm9kZTsgZGVwdGg6IG51bWJlciB9PiA9IFtcblx0XHR7IG5vZGU6IHJvb3QsIGRlcHRoOiAwIH0sXG5cdF07XG5cdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3Qgc2hpZnQgPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdGlmICghc2hpZnQpIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjb25zdCB7IG5vZGUsIGRlcHRoIH0gPSBzaGlmdDtcblx0XHRpZiAoZGVwdGggPT09IDMpIHtcblx0XHRcdG5vZGVzLnB1c2gobm9kZSk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0aWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRub2Rlcy5wdXNoKG5vZGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGNvbnN0IGl0ZW0gb2Ygbm9kZS5jaGlsZHJlbikge1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHsgbm9kZTogaXRlbSwgZGVwdGg6IGRlcHRoICsgMSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y29uc3QgbGFyZ2VOb2RlcyA9IG5vZGVzLnNvcnQoKGEsIGIpID0+IGIudmFsdWUgLSBhLnZhbHVlKS5zbGljZSgwLCAxMCk7XG5cdHJldHVybiB7XG5cdFx0bGFyZ2VOb2Rlcyxcblx0XHRoYXNPdGhlcjogbm9kZXMubGVuZ3RoID4gMTAsXG5cdH07XG59XG5cbmZ1bmN0aW9uIGZpeGVkUGVyY2VudChuOiBudW1iZXIsIGQ6IG51bWJlcik6IG51bWJlciB7XG5cdHJldHVybiBOdW1iZXIucGFyc2VGbG9hdCgoKG4gLyBkKSAqIDEwMCkudG9GaXhlZCgxKSk7XG59XG5cbmZ1bmN0aW9uIGZpbGVTaXplVGFibGUoZGF0YTogQXJyYXk8Q29tcGFyZVJlc3VsdD4pOiBzdHJpbmcge1xuXHRpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fVxuXHRsZXQgb3V0cHV0ID0gXCJcIjtcblx0b3V0cHV0ICs9IFwiPGRldGFpbHM+XFxuXCI7XG5cdG91dHB1dCArPSBcIjxzdW1tYXJ5PlRvcCB0ZW4gbGFyZ2VzdCBwYXRoczwvc3VtbWFyeT5cXG5cIjtcblx0Zm9yIChjb25zdCBkIG9mIGRhdGEpIHtcblx0XHRvdXRwdXQgKz0gXCJcXG5cIjtcblx0XHRvdXRwdXQgKz0gYCMjIE1ldGEgZmlsZTogJHtkLm1ldGFmaWxlfSwgT3V0IGZpbGU6ICR7ZC5vdXRmaWxlfVxcbmA7XG5cdFx0aWYgKCFkLnRyZWUpIHtcblx0XHRcdG91dHB1dCArPSBcIlx1RkUwRlx1RkUwRlx1RDgzRFx1REREMVx1RkUwRkRlbGV0ZWRcXG5cIjtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRvdXRwdXQgKz0gXCJ8IFBhdGggfCBTaXplIHxcXG5cIjtcblx0XHRvdXRwdXQgKz0gXCJ8LS0tLS0tfC0tLS0tLS18XFxuXCI7XG5cdFx0Y29uc3QgdG90YWxTaXplID0gZC50cmVlLnZhbHVlO1xuXHRcdGNvbnN0IHsgbGFyZ2VOb2RlcywgaGFzT3RoZXIgfSA9IGZpbmRMYXJnZURpcmVjdG9yaWVzKGQudHJlZSk7XG5cdFx0Zm9yIChjb25zdCB7IHBhdGgsIHZhbHVlIH0gb2YgbGFyZ2VOb2Rlcykge1xuXHRcdFx0Y29uc3QgcGVyY2VudCA9IGZpeGVkUGVyY2VudCh2YWx1ZSwgdG90YWxTaXplKTtcblx0XHRcdG91dHB1dCArPSBgfCAke3BhdGh9IHwgJHtyZW5kZXJCYXIocGVyY2VudCwgdmFsdWUpfSB8XFxuYDtcblx0XHR9XG5cdFx0aWYgKGhhc090aGVyKSB7XG5cdFx0XHRjb25zdCBvdGhlclNpemUgPSB0b3RhbFNpemUgLSBsYXJnZU5vZGVzWzBdLnZhbHVlO1xuXHRcdFx0Y29uc3Qgb3RoZXJQZXJjZW50ID0gZml4ZWRQZXJjZW50KG90aGVyU2l6ZSwgdG90YWxTaXplKTtcblx0XHRcdG91dHB1dCArPSBgfCAob3RoZXIpIHwgJHtyZW5kZXJCYXIob3RoZXJQZXJjZW50LCBvdGhlclNpemUpfSB8XFxuYDtcblx0XHR9XG5cdH1cblx0b3V0cHV0ICs9IFwiPC9kZXRhaWxzPlxcblwiO1xuXHRyZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJCYXIocGVyY2VudDogbnVtYmVyLCBieXRlczogbnVtYmVyKTogc3RyaW5nIHtcblx0Y29uc3QgYmFyID0gcHJvZ3Jlc3MocGVyY2VudCAvIDEwMCk7XG5cdHJldHVybiBgXFwke3tcXFxcY29sb3J7R29sZGVucm9kfXsgJHtiYXJ9IH19fVxcJCAke3BlcmNlbnQudG9GaXhlZChcblx0XHQxLFxuXHQpfSUsICR7ZmlsZXNpemUoYnl0ZXMpfWA7XG59XG5cbi8vIEJsb2NrIHByb2dyZXNzaW9uIGlzIDEvOCA9IDAuMTI1XG5jb25zdCBibG9ja3MgPSBbXCJcIiwgXCJcdTI1OEZcIiwgXCJcdTI1OEVcIiwgXCJcdTI1OERcIiwgXCJcdTI1OENcIiwgXCJcdTI1OEJcIiwgXCJcdTI1OEFcIiwgXCJcdTI1ODlcIiwgXCJcdTI1ODhcIl07XG5jb25zdCBwcm9ncmVzc2lvbiA9IDEgLyAoYmxvY2tzLmxlbmd0aCAtIDEpO1xuZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWU6IG51bWJlciwgbGVuZ3RoID0gMjUsIHZtaW4gPSAwLjAsIHZtYXggPSAxLjApIHtcblx0Y29uc3QgdiA9IHZhbHVlICogbGVuZ3RoO1xuXHRjb25zdCBpbnRlZ2VyUGFydCA9IE1hdGguZmxvb3Iodik7XG5cdGNvbnN0IGZyYWN0aW9uYWxQYXJ0ID0gdiAtIGludGVnZXJQYXJ0O1xuXHRjb25zdCBpID0gTWF0aC5yb3VuZChcblx0XHQocHJvZ3Jlc3Npb24gKiBNYXRoLmZsb29yKGZyYWN0aW9uYWxQYXJ0IC8gcHJvZ3Jlc3Npb24pKSAvIHByb2dyZXNzaW9uLFxuXHQpO1xuXHRyZXR1cm4gXCJcdTI1ODhcIi5yZXBlYXQoaW50ZWdlclBhcnQpICsgYmxvY2tzW2ldO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTaXplKGQ6IENvbXBhcmVSZXN1bHQpOiBzdHJpbmcge1xuXHRyZXR1cm4gZmlsZXNpemUoZC5ieXRlcyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5vdGUoZDogQ29tcGFyZVJlc3VsdCwgcmVkVGhyZXNob2xkOiBudW1iZXIpOiBzdHJpbmcge1xuXHRpZiAoZC5yZW1hcmsgPT09IFwiZGVsZXRlZFwiKSB7XG5cdFx0cmV0dXJuIFwiXHVEODNEXHVEREQxXHVGRTBGIERlbGV0ZWRcIjtcblx0fVxuXHRpZiAoZC5yZW1hcmsgPT09IFwiYWRkZWRcIikge1xuXHRcdHJldHVybiBcIlx1RDgzQ1x1REQ5NSBBZGRlZFwiO1xuXHR9XG5cdGlmIChkLmRpZmYpIHtcblx0XHRjb25zdCBwZXJjZW50Q2hhbmdlID0gKGQuZGlmZiAvIGQuYnl0ZXMpICogMTAwO1xuXHRcdHJldHVybiBgJHtyZW5kZXJTdGF0dXNJbmRpY2F0b3IocGVyY2VudENoYW5nZSwgcmVkVGhyZXNob2xkKX0ke2ZpbGVzaXplKFxuXHRcdFx0ZC5kaWZmLFxuXHRcdCl9ICgke3NpZ24ocGVyY2VudENoYW5nZSl9JHtwZXJjZW50Q2hhbmdlLnRvRml4ZWQoMSl9JSlgO1xuXHR9XG5cdHJldHVybiBcIlx1MjcwNSAgTm8gY2hhbmdlXCI7XG59XG5cbmZ1bmN0aW9uIHNpZ24obnVtOiBudW1iZXIpOiBzdHJpbmcge1xuXHRyZXR1cm4gbnVtIDwgMCA/IFwiXCIgOiBcIitcIjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU3RhdHVzSW5kaWNhdG9yKFxuXHRwZXJjZW50Q2hhbmdlOiBudW1iZXIsXG5cdHJlZFRocmVzaG9sZDogbnVtYmVyLFxuKTogc3RyaW5nIHtcblx0bGV0IHJlczogc3RyaW5nO1xuXHRpZiAocGVyY2VudENoYW5nZSA+IDAgJiYgcGVyY2VudENoYW5nZSA8IHJlZFRocmVzaG9sZCkge1xuXHRcdHJlcyA9IFwiXHUyNkEwXHVGRTBGXCI7XG5cdH0gZWxzZSBpZiAocGVyY2VudENoYW5nZSA+PSByZWRUaHJlc2hvbGQpIHtcblx0XHRyZXMgPSBcIlx1MjAzQ1x1RkUwRlwiO1xuXHR9IGVsc2Uge1xuXHRcdHJlcyA9IFwiXHUyNzA1IFwiO1xuXHR9XG5cdHJldHVybiBgJHtyZXN9ICR7c2lnbihwZXJjZW50Q2hhbmdlKX1gO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgdHlwZSB7IE1ldGFmaWxlIH0gZnJvbSBcImVzYnVpbGRcIjtcbmltcG9ydCB0eXBlIHsgUmVwb3J0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZnVuY3Rpb24gbG9hZEpzb25GaWxlKHBhdGg6IHN0cmluZykge1xuXHRyZXR1cm4gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aCkudG9TdHJpbmcoXCJ1dGYtOFwiKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkTWV0YUZpbGUocGF0aDogc3RyaW5nKTogTWV0YWZpbGUge1xuXHRyZXR1cm4gbG9hZEpzb25GaWxlKHBhdGgpIGFzIE1ldGFmaWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEFuYWx5c2lzSnNvbihwYXRoOiBzdHJpbmcpOiBSZXBvcnQge1xuXHRyZXR1cm4gbG9hZEpzb25GaWxlKHBhdGgpIGFzIFJlcG9ydDtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FjdGlvbnMvdG9vbGtpdC9ibG9iLzgxYTczYWJhOGJlZGQ1MzJmNmVkZGNjNDFlZDNhMGZhZDhiMWNmZWIvcGFja2FnZXMvY29yZS9zcmMvY29yZS50cyNMMTI2XG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgdmFsID0gcHJvY2Vzcy5lbnZbYElOUFVUXyR7bmFtZS50b1VwcGVyQ2FzZSgpfWBdIHx8IFwiXCI7XG5cdHJldHVybiB2YWwudHJpbSgpO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHByb2Nlc3MgZnJvbSBcIm5vZGU6cHJvY2Vzc1wiO1xuXG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMsIFJlcG9ydCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBsb2FkTWV0YUZpbGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0KGlucHV0OiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IGFsbFBhZ2VTaXplcyA9IGdldEFsbFBhZ2VTaXplcyhpbnB1dCk7XG5cdGZzLm1rZGlyU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgaW5wdXQuYW5hbHl6ZXJEaXJlY3RvcnkpLCB7XG5cdFx0cmVjdXJzaXZlOiB0cnVlLFxuXHR9KTtcblx0Y29uc3QgcmVzdWx0SnNvblBhdGggPSBwYXRoLmpvaW4oXG5cdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRpbnB1dC5hbmFseXplckRpcmVjdG9yeSxcblx0XHRcImJ1bmRsZV9hbmFseXNpcy5qc29uXCIsXG5cdCk7XG5cdGZzLndyaXRlRmlsZVN5bmMocmVzdWx0SnNvblBhdGgsIEpTT04uc3RyaW5naWZ5KGFsbFBhZ2VTaXplcywgbnVsbCwgMikpO1xuXHRjb25zb2xlLmxvZyhgV3JvdGUgJHtyZXN1bHRKc29uUGF0aH1gKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsUGFnZVNpemVzKGlucHV0OiBPcHRpb25zKTogUmVwb3J0IHtcblx0Y29uc3QgYWNjOiBSZXBvcnQgPSB7fTtcblx0cmV0dXJuIGlucHV0Lm1ldGFmaWxlcy5yZWR1Y2UoKGFjYywgbWV0YWZpbGUpID0+IHtcblx0XHRjb25zdCBtZXRhRmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgbWV0YWZpbGUpO1xuXHRcdHRyeSB7XG5cdFx0XHRmcy5hY2Nlc3NTeW5jKG1ldGFGaWxlUGF0aCwgZnMuY29uc3RhbnRzLlJfT0spO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0YE5vIG1ldGEgZmlsZSBmb3VuZCBhdCBcIiR7bWV0YUZpbGVQYXRofVwiIC0gYSBwYXRoIHRvIG1ldGEgZmlsZSBtYXkgYmUgd3JvbmcsIG9yIGVzYnVpbGQgaXMgbm90IGV4ZWN1dGVkLmAsXG5cdFx0XHQpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1ldGFGaWxlSnNvbiA9IGxvYWRNZXRhRmlsZShtZXRhRmlsZVBhdGgpO1xuXHRcdE9iamVjdC5lbnRyaWVzKG1ldGFGaWxlSnNvbi5vdXRwdXRzKS5yZWR1Y2UoKGFjYywgb3V0cHV0KSA9PiB7XG5cdFx0XHRjb25zdCBbb3V0ZmlsZSwgYnVpbGRNZXRhXSA9IG91dHB1dDtcblx0XHRcdGlmIChcblx0XHRcdFx0IWlucHV0LmluY2x1ZGVFeHRlbnNpb25zLnNvbWUoKGV4dCkgPT5cblx0XHRcdFx0XHRvdXRmaWxlLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoZXh0KSxcblx0XHRcdFx0KVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBhY2M7XG5cdFx0XHR9XG5cdFx0XHRhY2NbYCR7bWV0YWZpbGV9IC0+ICR7b3V0ZmlsZX1gXSA9IHtcblx0XHRcdFx0Ynl0ZXM6IGJ1aWxkTWV0YS5ieXRlcyxcblx0XHRcdFx0bWV0YWZpbGUsXG5cdFx0XHRcdG91dGZpbGUsXG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIGFjYztcblx0XHR9LCBhY2MpO1xuXHRcdHJldHVybiBhY2M7XG5cdH0sIGFjYyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxxQkFBcUI7OztBQ0E5QixPQUFPQSxTQUFRO0FBQ2YsT0FBTyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RqQixPQUFPLFFBQVE7QUFLZixTQUFTLGFBQWFDLE9BQWM7QUFDbkMsU0FBTyxLQUFLLE1BQU0sR0FBRyxhQUFhQSxLQUFJLEVBQUUsU0FBUyxPQUFPLENBQUM7QUFDMUQ7QUFFTyxTQUFTLGFBQWFBLE9BQXdCO0FBQ3BELFNBQU8sYUFBYUEsS0FBSTtBQUN6QjtBQUVPLFNBQVMsaUJBQWlCQSxPQUFzQjtBQUN0RCxTQUFPLGFBQWFBLEtBQUk7QUFDekI7QUFHTyxTQUFTLFNBQVMsTUFBc0I7QUFDOUMsUUFBTSxNQUFNLFFBQVEsSUFBSSxTQUFTLEtBQUssWUFBWSxDQUFDLEVBQUUsS0FBSztBQUMxRCxTQUFPLElBQUksS0FBSztBQUNqQjs7O0FEZkEsU0FBUyxVQUNSLE9BQ2M7QUFDZCxRQUFNLE9BQW9CLEVBQUUsTUFBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLEVBQUU7QUFDdkUsYUFBVyxDQUFDLFVBQVUsRUFBRSxj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U0FBUyxNQUFNO0FBQzVCLE1BQUksQ0FBQyxNQUFNO0FBQ1YsVUFBTSxJQUFJLE1BQU0sdUJBQXVCO0FBQUEsRUFDeEM7QUFDQSxTQUFPO0FBQUEsSUFDTix1QkFBdUIsT0FBTztBQUFBLE1BQzdCLFNBQVMseUJBQXlCLEtBQUs7QUFBQSxNQUN2QztBQUFBLElBQ0Q7QUFBQSxJQUNBLGFBQWEsQ0FBQyxRQUFRLFFBQVEsTUFBTSxFQUFFO0FBQUEsTUFDckMsU0FBUyxjQUFjLEtBQUs7QUFBQSxJQUM3QjtBQUFBLElBQ0Esb0JBQ0MsU0FBUyxvQkFBb0IsS0FBSyxpQkFDakMsTUFBTSxHQUFHO0FBQUEsSUFDWDtBQUFBLElBQ0EsbUJBQW1CLFNBQVMsbUJBQW1CLEtBQUs7QUFBQSxJQUNwRCxXQUFXLGFBQWEsTUFBTSxHQUFHO0FBQUEsRUFDbEM7QUFDRDtBQUVPLFNBQVMsSUFBSSxVQUFtQixXQUFXLEdBQVM7QUFDMUQsU0FBTyxPQUFPO0FBQ2QsVUFBUSxPQUFPO0FBQ2hCO0FBRUEsSUFBSSxZQUFZLFFBQVEsY0FBYyxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTTtBQUM1RCxNQUFJO0FBQ0w7IiwKICAibmFtZXMiOiBbImZzIiwgInBhdGgiLCAiY2hpbGQiLCAiZnMiLCAiZmlsZXNpemUiLCAicGF0aCIsICJmcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZnMiLCAicGF0aCIsICJwcm9jZXNzIiwgImFjYyJdCn0K
