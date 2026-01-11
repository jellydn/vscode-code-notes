import type { AiToolType } from './aiTools'
import { getToolConfig } from './aiConfig'
import { getAiToolDefaultModel } from './aiTools'

function escapeDoubleQuotes(str: string): string {
  return str.replace(/"/g, '\\"')
}

function interpolateValues(prompt: string, model: string, customCommand: string, template: string): string {
  const escapedPrompt = escapeDoubleQuotes(prompt)

  return template
    .replace(/\{\{prompt\}\}/g, escapedPrompt)
    .replace(/\{\{model\}\}/g, model)
    .replace(/\{\{customCommand\}\}/g, customCommand)
}

export function buildCommand(
  tool: AiToolType,
  prompt: string,
  model?: string,
  customCommand?: string,
): string {
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error('Prompt is required and must be a non-empty string')
  }

  const config = getToolConfig(tool)
  return interpolateValues(prompt, model || '', customCommand || '', config.command)
}

export function getEffectiveModel(tool: AiToolType, configuredModel: string): string {
  if (configuredModel?.trim()) {
    return configuredModel
  }
  return getAiToolDefaultModel(tool)
}
