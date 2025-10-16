import { build } from './build.js';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, '../build');
const outputFilePath = resolve(outputDir, 'server.js');

mkdirSync(outputDir, { recursive: true });

await build({
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
  entryPoints: ['game/server/index.ts'],
  outfile: outputFilePath,
  external: [],
});

// Used to prevent yarn from running the script
writeFileSync(
  '.yarn.installed',
  new Date().toLocaleString('en-US', { timeZone: 'UTC', timeStyle: 'long', dateStyle: 'full' })
);


/* // Obfuscate the output file if not in dev mode
if (!process.argv.includes('--dev')) {
  const code = readFileSync(outputFilePath, 'utf-8');

  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: false,
    debugProtection: true,
    target: 'node',
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 1,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  });

  writeFileSync(outputFilePath, obfuscationResult.getObfuscatedCode());
  console.log('✅ Obfuscation complete.');
} */