import degit from 'degit'
import ora from 'ora'

// promisify(fs.exists);

export async function downloadTemplate(repo: string, projectName: string) {
  const githubRepo = `github:${repo}`
  const giteeRepo = `gitee:${repo}`
  const dest = `./${projectName}`

  const emitter = degit(githubRepo, {
    force: true,
    verbose: true
  })

  try {
    const spinner = ora(`从 GitHub 下载 ${repo}`).start()
    await emitter.clone(dest)
    spinner.succeed(`下载完成: ${repo}`)
  } catch (error) {
    console.log('⚠️ GitHub下载失败，尝试Gitee镜像...')
    const fallbackEmitter = degit(giteeRepo, {
      force: true,
      verbose: true
    })

    try {
      const spinner = ora(`从 Gitee 下载 ${repo}`).start();
      await fallbackEmitter.clone(dest);
      spinner.succeed(`下载完成: ${repo}`);
    } catch (fallbackError: any) {
      throw new Error(`无法从GitHub/Gitee下载模板: ${fallbackError.message}`);
    }
  }
}
