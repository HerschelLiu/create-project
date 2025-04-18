import { Command } from 'commander';
import { run } from './core/run.ts';

const program = new Command();

program
  .version('1.0.0')
  .description('Herschel项目脚手架生成工具')
  .argument('[project-name]', '项目名称')
  .action(async (projectName) => {
    await run(projectName);
  });

program.parse(process.argv);