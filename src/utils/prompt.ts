import inquirer from 'inquirer';

export async function promptPackageManager(): Promise<{ packageManager: PackageManager }> {
  return inquirer.prompt<{ packageManager: PackageManager }>({
    type: 'list',
    name: 'packageManager',
    message: '选择包管理工具:',
    choices: [
      { name: 'npm', value: 'npm' },
      { name: 'pnpm', value: 'pnpm' },
      { name: 'yarn', value: 'yarn' }
    ],
    default: 'npm'
  });
}
