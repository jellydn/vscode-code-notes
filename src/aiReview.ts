import type { Comment } from './types'

export interface FormattedCommentsResult {
  formattedComments: string
  files: string[]
}

export function formatCommentsForAI(comments: Comment[]): FormattedCommentsResult {
  const commentsByFile = new Map<string, Comment[]>()

  for (const comment of comments) {
    const existing = commentsByFile.get(comment.filePath) || []
    existing.push(comment)
    commentsByFile.set(comment.filePath, existing)
  }

  const lines: string[] = []
  const files: string[] = []

  for (const [filePath, fileComments] of commentsByFile) {
    files.push(filePath)
    for (const comment of fileComments) {
      const lineRange = comment.startLine === comment.endLine
        ? `${comment.startLine}`
        : `${comment.startLine}-${comment.endLine}`
      lines.push(`[${comment.category}] ${filePath}:${lineRange} - ${comment.text}`)
    }
  }

  return {
    formattedComments: lines.join('\n'),
    files,
  }
}
