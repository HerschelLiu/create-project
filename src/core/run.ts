import ora from 'ora';
import { downloadTemplate } from '../utils/downloader.ts';
import { updateProjectNames } from '../utils/package.ts';
import { getProjectName, selectTemplate, getProjectPath } from './project.ts';
import { installDependencies } from './installer.ts';

// 主运行函数
export async function run(projectName?: string): Promise<void> {
  try {
    // 获取项目名称
    projectName = await getProjectName(projectName);
    const projectPath = getProjectPath(projectName);

    // 选择模板
    const template = await selectTemplate();

    // 下载模板
    const spinner = ora('正在下载模板...').start();
    await downloadTemplate(template, projectName);
    spinner.succeed('模板下载完成');

    // 修改项目名称
    await updateProjectNames(projectPath, projectName);

    // 安装依赖
    await installDependencies(projectPath);

    console.log('✅ 项目创建成功！');
    process.exit(0)
  } catch (error: any) {
    console.error('❌ 创建失败:', error.message);
    process.exit(1);
  }
}
