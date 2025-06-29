import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { GhostAPIClientInterface } from '../api/types.js';
import { handleToolError, ValidationError } from '../utils/errors.js';

export abstract class BaseToolModule {
  constructor(protected client: GhostAPIClientInterface) {}

  abstract getTools(): Tool[];

  abstract getHandler(toolName: string): (args: any) => Promise<any>;

  protected handleError(error: unknown): never {
    handleToolError(error);
  }

  protected createTool(name: string, description: string, inputSchema: any): Tool {
    return {
      name,
      description,
      inputSchema: {
        type: 'object',
        properties: inputSchema,
        additionalProperties: false,
      },
    };
  }

  protected formatResponse(data: any, message?: string): string {
    if (message) {
      return `${message}\n\n${JSON.stringify(data, null, 2)}`;
    }
    return JSON.stringify(data, null, 2);
  }

  protected validateRequired(args: any, required: string[]): void {
    for (const field of required) {
      if (args[field] === undefined || args[field] === null) {
        throw new ValidationError(`Missing required field: ${field}`, field);
      }
    }
  }

  protected validateOneOf(args: any, fields: string[]): void {
    const provided = fields.filter(field => args[field] !== undefined);
    if (provided.length === 0) {
      throw new ValidationError(`One of ${fields.join(', ')} is required`);
    }
    if (provided.length > 1) {
      throw new ValidationError(`Only one of ${fields.join(', ')} should be provided`);
    }
  }

  protected convertHtmlToMobiledoc(html: string): string {
    // Simple HTML to Mobiledoc conversion
    // In production, you might want to use a proper converter
    return JSON.stringify({
      version: '0.3.1',
      atoms: [],
      cards: [['html', { cardName: 'html', html }]],
      markups: [],
      sections: [[10, 0]],
    });
  }

  protected ensureArray<T>(value: T | T[] | undefined): T[] {
    if (value === undefined) return [];
    return Array.isArray(value) ? value : [value];
  }

  protected parseDate(dateString: string | undefined): string | undefined {
    if (!dateString) return undefined;
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new ValidationError(`Invalid date format: ${dateString}`);
      }
      return date.toISOString();
    } catch (error) {
      throw new ValidationError(`Invalid date format: ${dateString}`);
    }
  }

  protected sanitizeFilter(filter: string): string {
    // Basic sanitization of Ghost filter strings
    return filter.trim().replace(/\s+/g, ' ');
  }

  protected buildIncludeString(include: string[] | string | undefined): string | undefined {
    if (!include) return undefined;
    const includes = this.ensureArray(include);
    return includes.join(',');
  }
}