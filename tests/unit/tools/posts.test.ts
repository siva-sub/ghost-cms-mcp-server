import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PostTools } from '../../../src/tools/posts';
import { GhostAPIClient } from '../../__mocks__/client';
import { ghostResponses } from '../../fixtures/ghost-responses';
import { GhostError } from '../../../src/utils/errors';

describe('PostTools', () => {
  let postTools: PostTools;
  let mockClient: jest.Mocked<GhostAPIClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = new GhostAPIClient() as jest.Mocked<GhostAPIClient>;
    
    postTools = new PostTools(mockClient as any);
  });

  describe('getTools', () => {
    it('should return all post-related tools', () => {
      const tools = postTools.getTools();
      
      expect(tools).toHaveLength(10);
      
      const toolNames = tools.map(t => t.name);
      expect(toolNames).toContain('ghost_posts_list');
      expect(toolNames).toContain('ghost_posts_get');
      expect(toolNames).toContain('ghost_posts_create');
      expect(toolNames).toContain('ghost_posts_update');
      expect(toolNames).toContain('ghost_posts_delete');
      expect(toolNames).toContain('ghost_posts_publish');
      expect(toolNames).toContain('ghost_posts_unpublish');
      expect(toolNames).toContain('ghost_posts_search');
      expect(toolNames).toContain('ghost_posts_bulk_update');
      expect(toolNames).toContain('ghost_posts_bulk_delete');
      
      tools.forEach(tool => {
        expect(tool).toBeValidTool();
      });
    });
  });

  describe('ghost_posts_list', () => {
    const handler = 'ghost_posts_list';

    it('should list posts with default parameters', async () => {
      mockClient.getPosts.mockResolvedValue({ data: ghostResponses.posts.list } as any);
      
      const result = await postTools.getHandler(handler)({});
      
      expect(mockClient.getPosts).toHaveBeenCalledWith({});
      expect(result).toContain('Found 2 posts');
      expect(result).toContain('Test Post 1');
      expect(result).toContain('Test Post 2');
    });

    it('should list posts with filters', async () => {
      mockClient.getPosts.mockResolvedValue({ data: ghostResponses.posts.list } as any);
      
      const args = {
        filter: 'status:published',
        limit: 10,
        order: 'published_at desc',
        include: 'tags,authors',
      };
      
      await postTools.getHandler(handler)(args);
      
      expect(mockClient.getPosts).toHaveBeenCalledWith(args);
    });

    it('should handle empty results', async () => {
      mockClient.getPosts.mockResolvedValue({ 
        data: { 
          posts: [], 
          meta: { pagination: { total: 0 } } 
        } 
      });
      
      const result = await postTools.getHandler(handler)({});
      
      expect(result).toContain('Found 0 posts');
    });

    it('should handle API errors', async () => {
      const error = new GhostError('API Error', 500);
      mockClient.getPosts.mockRejectedValue(error);
      
      await expect(postTools.getHandler(handler)({}))
        .rejects.toThrow('Server error: API Error. Please try again later.');
    });
  });

  describe('ghost_posts_get', () => {
    const handler = 'ghost_posts_get';

    it('should get a single post by ID', async () => {
      mockClient.getPost.mockResolvedValue({ data: ghostResponses.posts.single } as any);
      
      const result = await postTools.getHandler(handler)({ id: '1' });
      
      expect(mockClient.getPost).toHaveBeenCalledWith('1', {});
      expect(result).toContain('Post retrieved successfully');
      expect(result).toContain('Test Post 1');
    });

    it('should get a single post by slug', async () => {
      mockClient.getPostBySlug.mockResolvedValue({ data: ghostResponses.posts.single } as any);
      
      const result = await postTools.getHandler(handler)({ slug: 'test-post-1' });
      
      expect(mockClient.getPostBySlug).toHaveBeenCalledWith('test-post-1', {});
      expect(result).toContain('Post retrieved successfully');
    });

    it('should require either id or slug', async () => {
      await expect(postTools.getHandler(handler)({}))
        .rejects.toThrow('One of id, slug is required');
    });

    it('should handle not found errors', async () => {
      const error = new GhostError('Post not found', 404);
      mockClient.getPost.mockRejectedValue(error);
      
      await expect(postTools.getHandler(handler)({ id: 'invalid' }))
        .rejects.toThrow('Resource not found: Post not found');
    });
  });

  describe('ghost_posts_create', () => {
    const handler = 'ghost_posts_create';

    it('should create a post with required fields', async () => {
      mockClient.createPost.mockResolvedValue({ data: ghostResponses.posts.created } as any);
      
      const args = {
        title: 'New Test Post',
        html: '<p>New content</p>',
      };
      
      const result = await postTools.getHandler(handler)(args);
      
      expect(mockClient.createPost).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Test Post',
          mobiledoc: expect.stringContaining('New content'),
        })
      );
      expect(result).toContain('Post created successfully');
      expect(result).toContain('New Test Post');
    });

    it('should create a post with all fields', async () => {
      mockClient.createPost.mockResolvedValue({ data: ghostResponses.posts.created } as any);
      
      const args = {
        title: 'Full Post',
        html: '<p>Full content</p>',
        status: 'published',
        slug: 'full-post',
        featured: true,
        tags: ['tag1', 'tag2'],
        meta_title: 'SEO Title',
        meta_description: 'SEO Description',
        published_at: '2024-01-01T00:00:00.000Z',
        custom_excerpt: 'Custom excerpt',
        authors: ['author1@example.com'],
      };
      
      await postTools.getHandler(handler)(args);
      
      expect(mockClient.createPost).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Full Post',
          status: 'published',
          slug: 'full-post',
          featured: true,
          tags: ['tag1', 'tag2'],
          meta_title: 'SEO Title',
          meta_description: 'SEO Description',
          published_at: '2024-01-01T00:00:00.000Z',
          custom_excerpt: 'Custom excerpt',
          authors: ['author1@example.com'],
        })
      );
    });

    it('should support mobiledoc input', async () => {
      mockClient.createPost.mockResolvedValue({ data: ghostResponses.posts.created } as any);
      
      const mobiledoc = '{"version":"0.3.1","atoms":[],"cards":[],"markups":[],"sections":[]}';
      const args = {
        title: 'Mobiledoc Post',
        mobiledoc,
      };
      
      await postTools.getHandler(handler)(args);
      
      expect(mockClient.createPost).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Mobiledoc Post',
          mobiledoc,
        })
      );
    });

    it('should require title', async () => {
      await expect(postTools.getHandler(handler)({ html: '<p>Content</p>' }))
        .rejects.toThrow('Missing required field: title');
    });

    it('should require content', async () => {
      await expect(postTools.getHandler(handler)({ title: 'Title' }))
        .rejects.toThrow('Either mobiledoc or html content is required');
    });

    it('should handle validation errors', async () => {
      const error = new GhostError('Validation failed', 422, ghostResponses.errors.validation);
      mockClient.createPost.mockRejectedValue(error);
      
      await expect(postTools.getHandler(handler)({ title: '', html: '<p>Content</p>' }))
        .rejects.toThrow('Validation error');
    });
  });

  describe('ghost_posts_update', () => {
    const handler = 'ghost_posts_update';

    it('should update a post', async () => {
      // First get the post
      mockClient.getPost.mockResolvedValue({ data: ghostResponses.posts.single } as any);
      
      // Then update it
      const updatedPost = {
        ...ghostResponses.posts.single.posts[0],
        title: 'Updated Title',
        updated_at: new Date().toISOString(),
      };
      mockClient.updatePost.mockResolvedValue({ 
        data: { posts: [updatedPost] } 
      });
      
      const args = {
        id: '1',
        title: 'Updated Title',
      };
      
      const result = await postTools.getHandler(handler)(args);
      
      expect(mockClient.getPost).toHaveBeenCalledWith('1', {});
      expect(mockClient.updatePost).toHaveBeenCalledWith('1', 
        expect.objectContaining({
          title: 'Updated Title',
          updated_at: expect.any(String),
        })
      );
      expect(result).toContain('Post updated successfully');
      expect(result).toContain('Updated Title');
    });

    it('should update post with HTML content', async () => {
      mockClient.getPost.mockResolvedValue({ data: ghostResponses.posts.single } as any);
      mockClient.updatePost.mockResolvedValue({ data: ghostResponses.posts.single } as any);
      
      const args = {
        id: '1',
        html: '<p>Updated HTML content</p>',
      };
      
      await postTools.getHandler(handler)(args);
      
      expect(mockClient.updatePost).toHaveBeenCalledWith('1', 
        expect.objectContaining({
          mobiledoc: expect.stringContaining('Updated HTML content'),
          updated_at: expect.any(String),
        })
      );
    });

    it('should require id', async () => {
      await expect(postTools.getHandler(handler)({ title: 'Updated' }))
        .rejects.toThrow('Missing required field: id');
    });

    it('should handle concurrent update conflicts', async () => {
      mockClient.getPost.mockResolvedValue({ data: ghostResponses.posts.single } as any);
      
      const error = new GhostError('Saving failed! Someone else is editing this post.', 409);
      mockClient.updatePost.mockRejectedValue(error);
      
      await expect(postTools.getHandler(handler)({ id: '1', title: 'Updated' }))
        .rejects.toThrow('Someone else is editing this post');
    });
  });

  describe('ghost_posts_delete', () => {
    const handler = 'ghost_posts_delete';

    it('should delete a post', async () => {
      mockClient.deletePost.mockResolvedValue({ data: {} });
      
      const result = await postTools.getHandler(handler)({ id: '1' });
      
      expect(mockClient.deletePost).toHaveBeenCalledWith('1');
      expect(result).toBe('Post deleted successfully');
    });

    it('should require id', async () => {
      await expect(postTools.getHandler(handler)({}))
        .rejects.toThrow('Missing required field: id');
    });

    it('should handle not found errors', async () => {
      const error = new GhostError('Post not found', 404);
      mockClient.deletePost.mockRejectedValue(error);
      
      await expect(postTools.getHandler(handler)({ id: 'invalid' }))
        .rejects.toThrow('Resource not found: Post not found');
    });
  });

  describe('ghost_posts_publish', () => {
    const handler = 'ghost_posts_publish';

    it('should publish a draft post', async () => {
      // Get draft post
      const draftPost = { ...ghostResponses.posts.list.posts[1], status: 'draft' };
      mockClient.getPost.mockResolvedValue({ data: { posts: [draftPost] } });
      
      // Update to published
      const publishedPost = { ...draftPost, status: 'published', published_at: new Date().toISOString() };
      mockClient.updatePost.mockResolvedValue({ data: { posts: [publishedPost] } });
      
      const result = await postTools.getHandler(handler)({ id: '2' });
      
      expect(mockClient.updatePost).toHaveBeenCalledWith('2', 
        expect.objectContaining({
          status: 'published',
          published_at: expect.any(String),
        })
      );
      expect(result).toContain('Post published successfully');
    });

    it('should publish with specific date', async () => {
      const draftPost = { ...ghostResponses.posts.list.posts[1], status: 'draft' };
      mockClient.getPost.mockResolvedValue({ data: { posts: [draftPost] } });
      mockClient.updatePost.mockResolvedValue({ data: { posts: [draftPost] } });
      
      const publishDate = '2024-12-25T00:00:00.000Z';
      await postTools.getHandler(handler)({ id: '2', published_at: publishDate });
      
      expect(mockClient.updatePost).toHaveBeenCalledWith('2', 
        expect.objectContaining({
          status: 'published',
          published_at: publishDate,
        })
      );
    });

    it('should handle already published posts', async () => {
      const publishedPost = { ...ghostResponses.posts.single.posts[0], status: 'published' };
      mockClient.getPost.mockResolvedValue({ data: { posts: [publishedPost] } });
      
      await expect(postTools.getHandler(handler)({ id: '1' }))
        .rejects.toThrow('Post is already published');
    });
  });

  describe('ghost_posts_search', () => {
    const handler = 'ghost_posts_search';

    it('should search posts by query', async () => {
      mockClient.searchPosts.mockResolvedValue({ data: ghostResponses.posts.list });
      
      const result = await postTools.getHandler(handler)({ query: 'test' });
      
      expect(mockClient.searchPosts).toHaveBeenCalledWith('test', {});
      expect(result).toContain('Found 2 posts matching "test"');
    });

    it('should require query', async () => {
      await expect(postTools.getHandler(handler)({}))
        .rejects.toThrow('Missing required field: query');
    });
  });

  describe('ghost_posts_bulk_update', () => {
    const handler = 'ghost_posts_bulk_update';

    it('should bulk update posts', async () => {
      mockClient.bulkUpdatePosts.mockResolvedValue({ 
        data: { 
          bulk: { 
            meta: { 
              stats: { successful: 2, unsuccessful: 0 } 
            } 
          } 
        } 
      } as any);
      
      const args = {
        filter: 'status:draft',
        data: { status: 'published' },
      };
      
      const result = await postTools.getHandler(handler)(args);
      
      expect(mockClient.bulkUpdatePosts).toHaveBeenCalledWith('status:draft', { status: 'published' });
      expect(result).toContain('Bulk update completed: 2 successful, 0 failed');
    });

    it('should require filter and data', async () => {
      await expect(postTools.getHandler(handler)({ filter: 'status:draft' }))
        .rejects.toThrow('Missing required field: data');
      
      await expect(postTools.getHandler(handler)({ data: { status: 'published' } }))
        .rejects.toThrow('Missing required field: filter');
    });
  });

  describe('ghost_posts_bulk_delete', () => {
    const handler = 'ghost_posts_bulk_delete';

    it('should bulk delete posts', async () => {
      mockClient.bulkDeletePosts.mockResolvedValue({ 
        data: { 
          bulk: { 
            meta: { 
              stats: { successful: 5, unsuccessful: 0 } 
            } 
          } 
        } 
      } as any);
      
      const result = await postTools.getHandler(handler)({ 
        filter: 'status:draft+created_at:<2024-01-01',
        confirm: true,
      });
      
      expect(mockClient.bulkDeletePosts).toHaveBeenCalledWith('status:draft+created_at:<2024-01-01');
      expect(result).toContain('Bulk delete completed: 5 posts deleted');
    });

    it('should require confirmation', async () => {
      await expect(postTools.getHandler(handler)({ filter: 'status:draft' }))
        .rejects.toThrow('Confirmation required for bulk delete');
    });
  });
});