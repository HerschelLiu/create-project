import inquirer from 'inquirer';
import path from 'path';
import { getTemplateChoices } from '../template/git.ts';

// 获取项目名称
export async function getProjectName(initialName?: string): Promise<string> {
  if (initialName) return initialName;
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: '请输入项目名称:',
    validate: (input: string) => /^[a-z0-9-~]+$/.test(input)
  });
  
  return name;
}

// 选择模板
export async function selectTemplate(): Promise<string> {
  const { templateType } = await inquirer.prompt({
    type: 'list',
    name: 'templateType',
    message: '选择项目模板:',
    choices: getTemplateChoices()
  });

  // 处理自定义模板
  if (templateType === 'custom') {
    const { customTemplate } = await inquirer.prompt({
      type: 'input',
      name: 'customTemplate',
      message: '输入模板地址 (格式: username/repo):',
      validate: (input: string) => /^[\w-]+\/[\w-]+$/.test(input)
    });
    return customTemplate;
  }

  return templateType;
}

// 获取项目路径
export function getProjectPath(projectName: string): string {
  return path.join(process.cwd(), projectName);
}
