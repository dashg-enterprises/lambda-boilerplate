import { build } from 'esbuild';
import { esbuildDecorators } from 'esbuild-decorators'
import { argv } from 'node:process';

const environment = argv[2];
const lambdaEntryPoint = argv[3];

if (environment !== 'local' && environment !== 'prod') throw new Error("Must select local or prod at argv[2]");
if (!lambdaEntryPoint) throw new Error("No lambda entry point provided at argv[3]");

const isLocal = environment === 'local';
const isProd = environment === 'prod';

async function lambdaBuilder(
  tsconfig = "./tsconfig.json",
  entryPoints = [lambdaEntryPoint],
  outfile = "./out/index.js",
  cwd = process.cwd()
) {
  await build({
    platform: 'node',
    target: 'es2020',
    sourcemap: isLocal,
    minify: isProd,
    bundle: isProd,
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