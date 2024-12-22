import { build } from 'esbuild';
import { esbuildDecorators } from 'esbuild-decorators'
import { argv } from 'node:process';

const buildMode = argv[2];
const lambdaEntryPoint = argv[3];

if (buildMode !== 'debug' && buildMode !== 'release') throw new Error("Must select debug or release at argv[2]");
if (!lambdaEntryPoint) throw new Error("No lambda entry point provided at argv[3]");

const isDebug = buildMode === 'debug';
const isRelease = buildMode === 'release';

async function lambdaBuilder(
  tsconfig = "./tsconfig.json",
  entryPoints = [lambdaEntryPoint],
  outfile = "./out/index.js",
  cwd = process.cwd()
) {
  await build({
    platform: 'node',
    target: 'es2020',
    sourcemap: isDebug,
    packages: isDebug ? "external" : "bundle",
    minify: isRelease,
    bundle: isRelease,
    plugins: [
      esbuildDecorators({
        tsconfig,
        cwd,
      }),
    ],
    tsconfig,
    entryPoints,
    outfile,
    external: [
      // This is likely to be your friend...
    ],
    
  });
}

lambdaBuilder();