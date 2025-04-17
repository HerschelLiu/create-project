import path from "path";
import { Command } from 'commander';
import inquirer from 'inquirer';
import { downloadTemplate } from './utils/downloader.ts';
import { updateProjectNames } from './utils/package.ts';
import { promptPackageManager } from './utils/prompt.ts';
import { getTemplateChoices } from './utils/git-templates.ts';
import ora from 'ora';
import { execa } from 'execa';

const program = new Command();

program
  .version('1.0.0')
  .description('Herschel项目脚手架生成工具')
  .argument('[project-name]', '项目名称')
  .action(async (projectName) => {
    try {
      // 获取项目名称
      if (!projectName) {
        const { name } = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: '请输入项目名称:',
          validate: (input: string) => /^(@[a-z0-9-~]+\/)?[a-z0-9-~]+$/.test(input)
        });
        projectName = name;
      }

      const projectPath  = path.join(process.cwd(), projectName)

      // 选择模板
      const { templateType } = await inquirer.prompt({
        type: 'list',
        name: 'templateType',
        message: '选择项目模板:',
        choices: getTemplateChoices()
      });

      // 处理自定义模板
      let template = templateType;
      if (templateType === 'custom') {
        const { customTemplate } = await inquirer.prompt({
          type: 'input',
          name: 'customTemplate',
          message: '输入模板地址 (格式: username/repo):',
          validate: (input: string) => /^[\w-]+\/[\w-]+$/.test(input)
        });
        template = customTemplate;
      }

      // 下载模板
      const spinner = ora('正在下载模板...').start();
      await downloadTemplate(template, projectName);
      spinner.succeed('模板下载完成');

      // 修改项目名称
      await updateProjectNames(projectPath, projectName);

      // 选择包管理器
      const { packageManager } = await promptPackageManager();
      
      // 安装依赖
      const installSpinner = ora('正在安装依赖...').start();
      await execa(packageManager, ['install'], { 
        cwd: projectPath,
        stdio: 'inherit'
      });
      installSpinner.succeed('依赖安装完成');

      console.log('✅ 项目创建成功！');

    } catch (error: any) {
      console.error('❌ 创建失败:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
