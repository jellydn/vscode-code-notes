import type { Comment } from './types'
import { window } from 'vscode'

export function formatLineRange(startLine: number, endLine: number): string {
  return startLine === endLine ? `line ${startLine}` : `lines ${startLine}-${endLine}`
}

export function showCommentAddedMessage(filePath: string, startLine: number, endLine: number): void {
  const lineRange = formatLineRange(startLine, endLine)
  window.showInformationMessage(`Comment added at ${lineRange} in ${filePath}`)
}

export function showCommentUpdatedMessage(comment: Comment): void {
  const lineRange = formatLineRange(comment.startLine, comment.endLine)
  window.showInformationMessage(`Comment updated at ${lineRange} in ${comment.filePath}`)
}

export function showCommentDeletedMessage(comment: Comment): void {
  const lineRange = formatLineRange(comment.startLine, comment.endLine)
  window.showInformationMessage(`Comment deleted at ${lineRange} in ${comment.filePath}`)
}

export function showCommentsSentMessage(count: number, context: string = ''): void {
  const contextText = context ? ` ${context}` : ''
  window.showInformationMessage(`Sent ${count} comments${contextText} to AI review`)
}

export function showCommentsExportedMessage(count: number, format: string): void {
  window.showInformationMessage(`Exported ${count} comments to review-report.${format}`)
}

export function showCommentsClearedMessage(count: number): void {
  window.showInformationMessage(`Cleared ${count} comments`)
}
