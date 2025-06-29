import { describe, it, expect } from '@jest/globals';
import { PostTools } from '../../../src/tools/posts';

describe('PostTools - Simple Tests', () => {
  it('should be able to instantiate PostTools', () => {
    const mockClient = {
      getPosts: async () => ({ data: { posts: [], meta: { pagination: { total: 0 } } } }),
      getPost: async () => ({ data: { posts: [] } }),
    };
    
    const postTools = new PostTools(mockClient as any);
    expect(postTools).toBeDefined();
  });

  it('should return 10 tools', () => {
    const mockClient = {
      getPosts: async () => ({ data: { posts: [], meta: { pagination: { total: 0 } } } }),
      getPost: async () => ({ data: { posts: [] } }),
    };
    
    const postTools = new PostTools(mockClient as any);
    const tools = postTools.getTools();
    
    expect(tools).toHaveLength(10);
    expect(tools[0]).toHaveProperty('name');
    expect(tools[0]).toHaveProperty('description');
    expect(tools[0]).toHaveProperty('inputSchema');
  });

  it('should have expected tool names', () => {
    const mockClient = {
      getPosts: async () => ({ data: { posts: [], meta: { pagination: { total: 0 } } } }),
      getPost: async () => ({ data: { posts: [] } }),
    };
    
    const postTools = new PostTools(mockClient as any);
    const tools = postTools.getTools();
    const toolNames = tools.map(t => t.name);
    
    expect(toolNames).toContain('ghost_posts_list');
    expect(toolNames).toContain('ghost_posts_get');
    expect(toolNames).toContain('ghost_posts_create');
    expect(toolNames).toContain('ghost_posts_update');
    expect(toolNames).toContain('ghost_posts_delete');
  });
});