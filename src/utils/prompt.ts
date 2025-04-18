import inquirer from 'inquirer';
import { getPackageChoices } from '../template/package.ts';

export async function promptPackageManager(): Promise<{ packageManager: PackageManager }> {
  return inquirer.prompt<{ packageManager: PackageManager }>({
    type: 'list',
    name: 'packageManager',
    message: '选择包管理工具:',
    choices: getPackageChoices(),
    default: 'npm'
  });
}
