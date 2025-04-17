import fs from 'fs';
import path from 'path';
import pkg from 'fast-glob';
const { glob } = pkg;

export async function updateProjectNames(rootDir: string, projectName: string) {
  // 处理根目录package.json
  const pkgPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // 处理Monorepo子包
  if (isMonorepo(rootDir)) {
    const scope = projectName.startsWith('@') ? 
      projectName.split('/')[0] : 
      `@${projectName}`;

    const packages = await glob(
      ['**/package.json', '!**/node_modules/**'],
      { cwd: rootDir }
    );

    for (const pkgFile of packages) {
      const fullPath = path.join(rootDir, pkgFile);
      const subPkg = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      
      if (subPkg.name?.startsWith('@')) {
        const parts = subPkg.name.split('/');
        subPkg.name = `${scope}/${parts[1]}`;
        fs.writeFileSync(fullPath, JSON.stringify(subPkg, null, 2));
      }
    }
  }
}

function isMonorepo(dir: string): boolean {
  const checks = [
    'pnpm-workspace.yaml',
    'lerna.json',
    'packages/**/package.json'
  ];
  
  return checks.some(check => 
    fs.existsSync(path.join(dir, check)) ||
    (JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf-8')).workspaces)
  );
}
