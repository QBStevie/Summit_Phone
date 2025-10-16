import esbuild from 'esbuild';

const dev = process.argv.includes('--dev');

export const build = async (esbuildOptions) => {
  const ctx = await esbuild.context({
    bundle: true,
    logLevel: 'info',
    sourcemap: dev ? 'inline' : false,
    minify: !dev,
    keepNames: dev,
    define: {
      __DEV_MODE__: dev ? 'true' : 'false', // Ensure proper boolean value
    },
    ...esbuildOptions,
  });

  if (dev) {
    await ctx.watch();
    console.log('⚡ Watching for changes...');
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('✅ Build complete.');
  }
};