const path = require('path');
const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

// const baseUrl = "./"; // Either absolute or relative path. If relative it's resolved to current working directory.
const { paths, baseUrl, outDir } = tsConfig.compilerOptions;
for (const path in paths) {
    paths[path][0] = paths[path][0].replace("./src", ".")
}

tsConfigPaths.register({ baseUrl: path.resolve(baseUrl, outDir), paths });
