import { GhostErrorResponse } from '../types/ghost.js';

export class GhostError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: GhostErrorResponse | any,
  ) {
    super(message);
    this.name = 'GhostError';
    Object.setPrototypeOf(this, GhostError.prototype);
  }
}

export function isGhostError(error: unknown): error is GhostError {
  return error instanceof GhostError;
}

export function formatError(error: unknown): string {
  if (isGhostError(error)) {
    return `Ghost API Error (${error.statusCode}): ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function handleToolError(error: unknown): never {
  if (isGhostError(error)) {
    switch (error.statusCode) {
      case 400:
        throw new Error(`Invalid request: ${error.message}`);
      case 401:
        throw new Error(`Authentication failed: ${error.message}`);
      case 403:
        throw new Error(`Permission denied: ${error.message}`);
      case 404:
        throw new Error(`Resource not found: ${error.message}`);
      case 409:
        throw new Error(`Conflict: ${error.message}`);
      case 422:
        throw new Error(`Validation error: ${error.message}`);
      case 429:
        throw new Error(`Rate limit exceeded. Please try again later.`);
      case 500:
      case 502:
      case 503:
      case 504:
        throw new Error(`Server error: ${error.message}. Please try again later.`);
      default:
        throw new Error(`Ghost API error: ${error.message}`);
    }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error(`Unknown error: ${String(error)}`);
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfter?: number,
  ) {
    super(message);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}