import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolModule } from './base.js';
import { ValidationError } from '../utils/errors.js';

export class PostTools extends BaseToolModule {
  getTools(): Tool[] {
    return [
      this.createTool(
        'ghost_posts_list',
        'List posts with optional filters. Returns posts with metadata.',
        {
          limit: { 
            type: 'number', 
            description: 'Number of posts to return (default: 15, max: 100)' 
          },
          page: { 
            type: 'number', 
            description: 'Page number for pagination' 
          },
          filter: { 
            type: 'string', 
            description: 'Ghost filter string (e.g., "status:published", "tag:getting-started")' 
          },
          order: { 
            type: 'string', 
            description: 'Sort order (e.g., "published_at desc", "title asc")' 
          },
          include: { 
            type: 'string', 
            description: 'Include related data (e.g., "tags,authors,count.posts")' 
          },
          fields: { 
            type: 'string', 
            description: 'Limit fields returned (e.g., "title,slug,published_at")' 
          },
          formats: { 
            type: 'string', 
            description: 'Include post content formats (e.g., "html,mobiledoc")' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_get',
        'Get a single post by ID or slug',
        {
          id: { 
            type: 'string', 
            description: 'Post ID (UUID)' 
          },
          slug: { 
            type: 'string', 
            description: 'Post slug (URL-safe version of title)' 
          },
          include: { 
            type: 'string', 
            description: 'Include related data (e.g., "tags,authors")' 
          },
          fields: { 
            type: 'string', 
            description: 'Limit fields returned' 
          },
          formats: { 
            type: 'string', 
            description: 'Include content formats (e.g., "html,mobiledoc")' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_create',
        'Create a new post',
        {
          title: { 
            type: 'string', 
            description: 'Post title (required)' 
          },
          mobiledoc: { 
            type: 'string', 
            description: 'Post content in Mobiledoc format (JSON string)' 
          },
          html: { 
            type: 'string', 
            description: 'Post content in HTML (alternative to mobiledoc)' 
          },
          status: { 
            type: 'string', 
            description: 'Post status: "draft" (default) or "published"',
            enum: ['draft', 'published', 'scheduled']
          },
          slug: { 
            type: 'string', 
            description: 'URL slug for the post (auto-generated from title if not provided)' 
          },
          featured: { 
            type: 'boolean', 
            description: 'Whether post is featured (default: false)' 
          },
          tags: { 
            type: 'array', 
            description: 'Array of tag names, slugs, or {name, slug} objects' 
          },
          authors: { 
            type: 'array', 
            description: 'Array of author emails or {email} objects' 
          },
          meta_title: { 
            type: 'string', 
            description: 'SEO meta title' 
          },
          meta_description: { 
            type: 'string', 
            description: 'SEO meta description' 
          },
          og_title: { 
            type: 'string', 
            description: 'Open Graph title' 
          },
          og_description: { 
            type: 'string', 
            description: 'Open Graph description' 
          },
          twitter_title: { 
            type: 'string', 
            description: 'Twitter card title' 
          },
          twitter_description: { 
            type: 'string', 
            description: 'Twitter card description' 
          },
          published_at: { 
            type: 'string', 
            description: 'Publication date (ISO 8601 format)' 
          },
          custom_excerpt: { 
            type: 'string', 
            description: 'Custom post excerpt' 
          },
          codeinjection_head: { 
            type: 'string', 
            description: 'Code injection for post <head>' 
          },
          codeinjection_foot: { 
            type: 'string', 
            description: 'Code injection for post footer' 
          },
          custom_template: { 
            type: 'string', 
            description: 'Custom template name' 
          },
          canonical_url: { 
            type: 'string', 
            description: 'Canonical URL for SEO' 
          },
          visibility: { 
            type: 'string', 
            description: 'Post visibility: "public", "members", "paid", or "tiers"',
            enum: ['public', 'members', 'paid', 'tiers']
          },
          tiers: { 
            type: 'array', 
            description: 'Array of tier IDs when visibility is "tiers"' 
          },
          email_only: { 
            type: 'boolean', 
            description: 'Whether post is email-only' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_update',
        'Update an existing post',
        {
          id: { 
            type: 'string', 
            description: 'Post ID to update (required)' 
          },
          title: { 
            type: 'string', 
            description: 'New post title' 
          },
          mobiledoc: { 
            type: 'string', 
            description: 'New content in Mobiledoc format' 
          },
          html: { 
            type: 'string', 
            description: 'New content in HTML' 
          },
          status: { 
            type: 'string', 
            description: 'New status',
            enum: ['draft', 'published', 'scheduled']
          },
          slug: { 
            type: 'string', 
            description: 'New URL slug' 
          },
          featured: { 
            type: 'boolean', 
            description: 'Whether post is featured' 
          },
          tags: { 
            type: 'array', 
            description: 'New array of tags (replaces existing)' 
          },
          authors: { 
            type: 'array', 
            description: 'New array of authors (replaces existing)' 
          },
          meta_title: { 
            type: 'string', 
            description: 'New SEO meta title' 
          },
          meta_description: { 
            type: 'string', 
            description: 'New SEO meta description' 
          },
          published_at: { 
            type: 'string', 
            description: 'New publication date' 
          },
          custom_excerpt: { 
            type: 'string', 
            description: 'New custom excerpt' 
          },
          updated_at: { 
            type: 'string', 
            description: 'Force update timestamp (for conflict resolution)' 
          },
          visibility: { 
            type: 'string', 
            description: 'New visibility setting',
            enum: ['public', 'members', 'paid', 'tiers']
          },
        }
      ),

      this.createTool(
        'ghost_posts_delete',
        'Delete a post permanently',
        {
          id: { 
            type: 'string', 
            description: 'Post ID to delete (required)' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_publish',
        'Publish a draft post',
        {
          id: { 
            type: 'string', 
            description: 'Post ID to publish (required)' 
          },
          published_at: { 
            type: 'string', 
            description: 'Publication date (optional, defaults to now)' 
          },
          send_email: { 
            type: 'boolean', 
            description: 'Send email to subscribers (default: true)' 
          },
          email_segment: { 
            type: 'string', 
            description: 'Email segment filter (e.g., "status:free")' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_unpublish',
        'Unpublish a published post (convert to draft)',
        {
          id: { 
            type: 'string', 
            description: 'Post ID to unpublish (required)' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_search',
        'Search posts by query string',
        {
          query: { 
            type: 'string', 
            description: 'Search query (required)' 
          },
          limit: { 
            type: 'number', 
            description: 'Number of results to return' 
          },
          include: { 
            type: 'string', 
            description: 'Include related data' 
          },
        }
      ),

      this.createTool(
        'ghost_posts_bulk_update',
        'Bulk update multiple posts',
        {
          filter: { 
            type: 'string', 
            description: 'Filter to select posts (required, e.g., "status:draft")' 
          },
          data: { 
            type: 'object', 
            description: 'Data to update on matching posts (required)',
            properties: {
              status: { type: 'string' },
              featured: { type: 'boolean' },
              visibility: { type: 'string' },
              tags: { type: 'array' },
            }
          },
        }
      ),

      this.createTool(
        'ghost_posts_bulk_delete',
        'Bulk delete multiple posts (use with caution)',
        {
          filter: { 
            type: 'string', 
            description: 'Filter to select posts to delete (required)' 
          },
          confirm: { 
            type: 'boolean', 
            description: 'Confirmation required (must be true)' 
          },
        }
      ),
    ];
  }

  getHandler(toolName: string): (args: any) => Promise<any> {
    const handlers: Record<string, (args: any) => Promise<any>> = {
      ghost_posts_list: this.listPosts.bind(this),
      ghost_posts_get: this.getPost.bind(this),
      ghost_posts_create: this.createPost.bind(this),
      ghost_posts_update: this.updatePost.bind(this),
      ghost_posts_delete: this.deletePost.bind(this),
      ghost_posts_publish: this.publishPost.bind(this),
      ghost_posts_unpublish: this.unpublishPost.bind(this),
      ghost_posts_search: this.searchPosts.bind(this),
      ghost_posts_bulk_update: this.bulkUpdatePosts.bind(this),
      ghost_posts_bulk_delete: this.bulkDeletePosts.bind(this),
    };

    const handler = handlers[toolName];
    if (!handler) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    return handler;
  }

  private async listPosts(args: any): Promise<any> {
    try {
      const params = {
        limit: args.limit,
        page: args.page,
        filter: args.filter ? this.sanitizeFilter(args.filter) : undefined,
        order: args.order,
        include: this.buildIncludeString(args.include),
        fields: args.fields,
        formats: args.formats,
      };

      const response = await this.client.getPosts(params);
      const { posts, meta } = response.data;
      
      return this.formatResponse(
        response.data,
        `Found ${posts.length} posts (total: ${meta.pagination.total})`
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  private async getPost(args: any): Promise<any> {
    try {
      this.validateOneOf(args, ['id', 'slug']);
      
      const params = {
        include: this.buildIncludeString(args.include),
        fields: args.fields,
        formats: args.formats,
      };

      let response;
      if (args.id) {
        response = await this.client.getPost(args.id, params);
      } else {
        response = await this.client.getPostBySlug(args.slug, params);
      }

      const post = response.data.posts[0];
      if (!post) {
        throw new ValidationError('Post not found');
      }

      return this.formatResponse(post, 'Post retrieved successfully');
    } catch (error) {
      this.handleError(error);
    }
  }

  private async createPost(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['title']);
      
      if (!args.mobiledoc && !args.html) {
        throw new ValidationError('Either mobiledoc or html content is required');
      }

      const postData: any = {
        title: args.title,
        status: args.status || 'draft',
        featured: args.featured || false,
        visibility: args.visibility || 'public',
      };

      // Handle content
      if (args.mobiledoc) {
        postData.mobiledoc = args.mobiledoc;
      } else if (args.html) {
        postData.mobiledoc = this.convertHtmlToMobiledoc(args.html);
      }

      // Optional fields
      if (args.slug) postData.slug = args.slug;
      if (args.tags) postData.tags = this.ensureArray(args.tags);
      if (args.authors) postData.authors = this.ensureArray(args.authors);
      if (args.meta_title) postData.meta_title = args.meta_title;
      if (args.meta_description) postData.meta_description = args.meta_description;
      if (args.og_title) postData.og_title = args.og_title;
      if (args.og_description) postData.og_description = args.og_description;
      if (args.twitter_title) postData.twitter_title = args.twitter_title;
      if (args.twitter_description) postData.twitter_description = args.twitter_description;
      if (args.published_at) postData.published_at = this.parseDate(args.published_at);
      if (args.custom_excerpt) postData.custom_excerpt = args.custom_excerpt;
      if (args.codeinjection_head) postData.codeinjection_head = args.codeinjection_head;
      if (args.codeinjection_foot) postData.codeinjection_foot = args.codeinjection_foot;
      if (args.custom_template) postData.custom_template = args.custom_template;
      if (args.canonical_url) postData.canonical_url = args.canonical_url;
      if (args.tiers && args.visibility === 'tiers') postData.tiers = this.ensureArray(args.tiers);
      if (args.email_only !== undefined) postData.email_only = args.email_only;

      const response = await this.client.createPost(postData);
      const post = response.data.posts[0];

      return this.formatResponse(post, 'Post created successfully');
    } catch (error) {
      this.handleError(error);
    }
  }

  private async updatePost(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['id']);

      // Get current post to ensure it exists and get updated_at
      const currentResponse = await this.client.getPost(args.id, {});
      const currentPost = currentResponse.data.posts[0];
      if (!currentPost) {
        throw new ValidationError('Post not found');
      }

      const updateData: any = {
        updated_at: args.updated_at || currentPost.updated_at,
      };

      // Handle content update
      if (args.html && !args.mobiledoc) {
        updateData.mobiledoc = this.convertHtmlToMobiledoc(args.html);
      } else if (args.mobiledoc) {
        updateData.mobiledoc = args.mobiledoc;
      }

      // Copy over fields if provided
      const fields = [
        'title', 'status', 'slug', 'featured', 'meta_title', 
        'meta_description', 'og_title', 'og_description', 
        'twitter_title', 'twitter_description', 'custom_excerpt',
        'codeinjection_head', 'codeinjection_foot', 'custom_template',
        'canonical_url', 'visibility', 'email_only'
      ];

      for (const field of fields) {
        if (args[field] !== undefined) {
          updateData[field] = args[field];
        }
      }

      // Handle arrays
      if (args.tags !== undefined) updateData.tags = this.ensureArray(args.tags);
      if (args.authors !== undefined) updateData.authors = this.ensureArray(args.authors);
      if (args.tiers !== undefined) updateData.tiers = this.ensureArray(args.tiers);
      
      // Handle dates
      if (args.published_at !== undefined) {
        updateData.published_at = this.parseDate(args.published_at);
      }

      const response = await this.client.updatePost(args.id, updateData);
      const updatedPost = response.data.posts[0];

      return this.formatResponse(updatedPost, 'Post updated successfully');
    } catch (error) {
      this.handleError(error);
    }
  }

  private async deletePost(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['id']);
      
      await this.client.deletePost(args.id);
      return 'Post deleted successfully';
    } catch (error) {
      this.handleError(error);
    }
  }

  private async publishPost(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['id']);

      // Get current post
      const currentResponse = await this.client.getPost(args.id, {});
      const currentPost = currentResponse.data.posts[0];
      if (!currentPost) {
        throw new ValidationError('Post not found');
      }

      if (currentPost.status === 'published') {
        throw new ValidationError('Post is already published');
      }

      const updateData: any = {
        status: 'published',
        published_at: args.published_at || new Date().toISOString(),
        updated_at: currentPost.updated_at,
      };

      // Handle email sending options
      if (args.send_email !== undefined) {
        updateData.send_email_when_published = args.send_email;
      }
      if (args.email_segment) {
        updateData.email_segment = args.email_segment;
      }

      const response = await this.client.updatePost(args.id, updateData);
      const publishedPost = response.data.posts[0];

      return this.formatResponse(publishedPost, 'Post published successfully');
    } catch (error) {
      this.handleError(error);
    }
  }

  private async unpublishPost(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['id']);

      // Get current post
      const currentResponse = await this.client.getPost(args.id, {});
      const currentPost = currentResponse.data.posts[0];
      if (!currentPost) {
        throw new ValidationError('Post not found');
      }

      if (currentPost.status !== 'published') {
        throw new ValidationError('Post is not published');
      }

      const updateData = {
        status: 'draft' as const,
        updated_at: currentPost.updated_at,
      };

      const response = await this.client.updatePost(args.id, updateData);
      const unpublishedPost = response.data.posts[0];

      return this.formatResponse(unpublishedPost, 'Post unpublished successfully');
    } catch (error) {
      this.handleError(error);
    }
  }

  private async searchPosts(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['query']);

      const params = {
        limit: args.limit,
        include: this.buildIncludeString(args.include),
      };

      const response = await this.client.searchPosts(args.query, params);
      const { posts } = response.data;

      return this.formatResponse(
        response.data,
        `Found ${posts.length} posts matching "${args.query}"`
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  private async bulkUpdatePosts(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['filter', 'data']);

      if (!args.data || typeof args.data !== 'object') {
        throw new ValidationError('Update data must be an object');
      }

      const filter = this.sanitizeFilter(args.filter);
      const response = await this.client.bulkUpdatePosts(filter, args.data);
      
      const stats = response.data.bulk.meta.stats;
      return `Bulk update completed: ${stats.successful} successful, ${stats.unsuccessful} failed`;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async bulkDeletePosts(args: any): Promise<any> {
    try {
      this.validateRequired(args, ['filter']);
      
      if (!args.confirm) {
        throw new ValidationError('Confirmation required for bulk delete. Set confirm: true');
      }

      const filter = this.sanitizeFilter(args.filter);
      const response = await this.client.bulkDeletePosts(filter);
      
      const stats = response.data.bulk.meta.stats;
      return `Bulk delete completed: ${stats.successful} posts deleted`;
    } catch (error) {
      this.handleError(error);
    }
  }
}