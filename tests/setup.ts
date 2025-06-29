import { jest } from '@jest/globals';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment defaults
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error';
process.env.GHOST_URL = process.env.GHOST_URL || 'https://test.ghost.io';
process.env.GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY || 'test-id:test-secret';
process.env.GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY || 'test-content-key';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Add custom matchers
expect.extend({
  toBeValidTool(received: any) {
    const pass = 
      received &&
      typeof received.name === 'string' &&
      typeof received.description === 'string' &&
      received.inputSchema &&
      typeof received.inputSchema === 'object';

    return {
      pass,
      message: () => 
        pass
          ? `expected ${received} not to be a valid tool`
          : `expected ${received} to be a valid tool with name, description, and inputSchema`,
    };
  },
  
  toBeGhostError(received: any, expectedStatus?: number) {
    const isGhostError = 
      received &&
      received.name === 'GhostError' &&
      typeof received.statusCode === 'number' &&
      typeof received.message === 'string';
    
    const statusMatches = 
      expectedStatus === undefined || received.statusCode === expectedStatus;
    
    const pass = isGhostError && statusMatches;

    return {
      pass,
      message: () => {
        if (!isGhostError) {
          return `expected ${received} to be a GhostError`;
        }
        if (!statusMatches) {
          return `expected GhostError status ${received.statusCode} to be ${expectedStatus}`;
        }
        return `expected ${received} not to be a GhostError`;
      },
    };
  },
});

// Extend Jest matchers TypeScript definitions
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidTool(): R;
      toBeGhostError(expectedStatus?: number): R;
    }
  }
}