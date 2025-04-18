declare module 'degit' {
  interface DegitOptions {
    force?: boolean;
    verbose?: boolean;
    mode?: string;
  }

  interface DegitEmitter {
    clone(dest: string): Promise<void>;
    on(event: string, callback: Function): void;
  }

  export default function degit(repo: string, options?: DegitOptions): DegitEmitter;
}

interface CLIOptions {
  projectName: string;
  packageManager: PackageManager;
  templateSource: TemplateSource;
  autoInstall: boolean;
}

type PackageManager = 'pnpm' | 'npm' | 'yarn';
type TemplateSource = 'GitHub' | 'Gitee' | 'Custom';

interface TemplateConfig {
  repoPath: string;
  replacements: { from: string | RegExp; to: string }[];
}

interface FileSystemError extends Error {
  code: string;
  path: string;
}
