/** 包管理工具配置 */
const packages = [
  { name: 'npm', value: 'npm' },
  { name: 'pnpm', value: 'pnpm' },
  { name: 'yarn', value: 'yarn' }
];

/** 获取包管理工具 */
export function getPackageChoices() {
  return packages;
} 
