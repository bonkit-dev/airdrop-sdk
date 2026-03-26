import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.json',
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
  external: ['@coral-xyz/anchor', '@solana/web3.js', '@solana/spl-token'],
  outExtension({ format }) {
    return format === 'cjs' ? { js: '.cjs' } : { js: '.js' }
  },
})
