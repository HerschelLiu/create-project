/**
 * 项目模板配置
 */
const templates = [
  { name: 'uniapp-ts模板', value: 'HerschelLiu/template-uniapp-ts' },
  { name: 'Vue-monorepo模板', value: 'HerschelLiu/vue' },
  { name: '自定义模板', value: 'custom' }
];

/**
 * 获取模板选项
 */
export function getTemplateChoices() {
  return templates;
} 
