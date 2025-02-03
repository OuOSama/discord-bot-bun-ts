import { Glob } from 'bun'

export async function loadTsFilesPath(params: string) {
  try {
    const TsFiles = new Glob(params)
    const files: string[] = []
    for await (const fileResult of TsFiles.scan({
      absolute: true,
      onlyFiles: true,
    })) {
      files.push(fileResult)
    }
    return files
  } catch (error) {
    console.error('Error while scanning files:', error)
    throw error
  }
}
