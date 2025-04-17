import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  target: 'node16',
  banner: { js: '#!/usr/bin/env node' } // 保持 CLI 可执行性
});
