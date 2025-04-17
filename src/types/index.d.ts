declare module 'replace-in-file' {
  export interface ReplaceInFileConfig {
    files: string | string[];
    from: string | RegExp | Array<string | RegExp>;
    to: string | ((matched: string) => string);
    dry?: boolean;
    encoding?: string;
    ignore?: string | string[];
  }

  export function replaceInFile(config: ReplaceInFileConfig): Promise<any>;
}

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

// declare module 'inquirer' {
//   export interface Answers {
//     [key: string]: any;
//   }

//   export type QuestionCollection<T extends Answers = Answers> = Array<{
//     type: string;
//     name: string;
//     message: string;
//     choices?: Array<string | { name: string; value: string }>;
//     default?: any;
//     validate?: (input: string) => boolean;
//     when?: () => boolean;
//     transformer?: (input: string) => string;
//   }>;

//   export function prompt<T extends Answers = Answers>(questions: QuestionCollection<T>): Promise<T>;
// } 

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
