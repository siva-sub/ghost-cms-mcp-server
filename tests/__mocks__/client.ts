import { jest } from '@jest/globals';

export const GhostAPIClient = jest.fn().mockImplementation(() => ({
  getPosts: jest.fn(),
  getPost: jest.fn(),
  getPostBySlug: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
  publishPost: jest.fn(),
  unpublishPost: jest.fn(),
  searchPosts: jest.fn(),
  bulkUpdatePosts: jest.fn(),
  bulkDeletePosts: jest.fn(),
}));