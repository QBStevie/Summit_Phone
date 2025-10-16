import { build } from './build.js';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, '../build');
const outputFilePath = resolve(outputDir, 'client.js');

mkdirSync(outputDir, { recursive: true });

// Auto-run build
await build({
  platform: 'browser',
  target: ['es2021'],
  format: 'iife',
  entryPoints: ['game/client/index.ts'],
  outfile: outputFilePath,
})

// Obfuscate the output file if not in dev mode
if (!process.argv.includes('--dev')) {
  const code = readFileSync(outputFilePath, 'utf-8');

  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: false,
    debugProtection: true,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    stringArray: false,
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
}