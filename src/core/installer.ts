import ora from 'ora';
import { execa } from 'execa';
import { promptPackageManager } from '../utils/prompt.ts';

// 安装依赖
export async function installDependencies(projectPath: string): Promise<void> {
  // 选择包管理器
  const { packageManager } = await promptPackageManager();
  
  // 安装依赖
  const installSpinner = ora('正在安装依赖...').start();
  
  try {
    await execa(packageManager, ['install'], { 
      cwd: projectPath,
      stdio: 'inherit'
    });
    installSpinner.succeed('依赖安装完成');
  } catch (error: any) {
    // 如果是npm并且安装失败，尝试使用--legacy-peer-deps
    if (packageManager === 'npm') {
      installSpinner.info('npm安装失败，尝试使用--legacy-peer-deps...');
      try {
        await execa(packageManager, ['install', '--legacy-peer-deps'], {
          cwd: projectPath,
          stdio: 'inherit'
        });
        installSpinner.succeed('依赖安装完成');
        return;
      } catch (legacyError: any) {
        installSpinner.fail('依赖安装失败');
        throw legacyError;
      }
    } else {
      installSpinner.fail('依赖安装失败');
      throw error;
    }
  }
}
