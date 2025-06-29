import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import GhostAdminAPI from '@tryghost/admin-api';
import GhostContentAPI from '@tryghost/content-api';
// import NodeCache from 'node-cache'; // Will be used for caching in future version
import PQueue from 'p-queue';
import { GhostError, RateLimitError } from '../utils/errors.js';
import { GhostAPIConfig, GhostAPIClientInterface } from './types.js';
import {
  GhostPostsResponse,
  GhostPagesResponse,
  GhostMembersResponse,
  GhostTagsResponse,
  GhostUsersResponse,
  GhostNewslettersResponse,
  GhostTiersResponse,
  GhostSettingsResponse,
  GhostBulkOperationResponse,
  GhostPost,
  GhostPage,
  GhostMember,
  GhostTag,
  GhostUser,
  GhostNewsletter,
  GhostTier,
} from '../types/ghost.js';

export class GhostAPIClient implements GhostAPIClientInterface {
  private adminApi: any;
  private contentApi: any;
  private axiosClient: AxiosInstance;
  private requestQueue: PQueue;

  constructor(config: GhostAPIConfig) {
    
    // Parse URL to get the base URL
    const url = new URL(config.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    // Initialize Ghost Admin API client
    this.adminApi = new GhostAdminAPI({
      url: baseUrl,
      key: config.adminApiKey,
      version: 'v5.0',
    });

    // Initialize Ghost Content API client
    this.contentApi = new GhostContentAPI({
      url: baseUrl,
      key: config.contentApiKey,
      version: 'v5.0',
    });

    // Initialize axios for custom requests
    this.axiosClient = axios.create({
      baseURL: `${config.url}/ghost/api/admin`,
      timeout: 30000,
    });

    // Note: Cache functionality can be added later for performance optimization

    // Initialize request queue
    this.requestQueue = new PQueue({
      concurrency: 10,
      interval: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
      intervalCap: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    });

    // Setup error interceptor
    this.axiosClient.interceptors.response.use(
      (response) => response,
      this.handleError.bind(this)
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      const data = error.response.data as any;
      const message = data?.errors?.[0]?.message || error.message;
      const ghostError = new GhostError(message, error.response.status, data);
      
      if (error.response.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] || '60');
        throw new RateLimitError('Rate limit exceeded', retryAfter);
      }
      
      throw ghostError;
    }
    throw error;
  }

  private async queueRequest<T>(request: () => Promise<T>): Promise<T> {
    return this.requestQueue.add(request) as Promise<T>;
  }

  // Posts
  async getPosts(params?: any): Promise<AxiosResponse<GhostPostsResponse>> {
    return this.queueRequest(async () => {
      const posts = await this.contentApi.posts.browse({
        ...params,
        include: params?.include?.split(','),
      });
      return { data: posts } as AxiosResponse<GhostPostsResponse>;
    });
  }

  async getPost(id: string, params?: any): Promise<AxiosResponse<{ posts: GhostPost[] }>> {
    return this.queueRequest(async () => {
      const post = await this.contentApi.posts.read({ id }, {
        ...params,
        include: params?.include?.split(','),
      });
      return { data: { posts: [post] } } as AxiosResponse<{ posts: GhostPost[] }>;
    });
  }

  async getPostBySlug(slug: string, params?: any): Promise<AxiosResponse<{ posts: GhostPost[] }>> {
    return this.queueRequest(async () => {
      const post = await this.contentApi.posts.read({ slug }, {
        ...params,
        include: params?.include?.split(','),
      });
      return { data: { posts: [post] } } as AxiosResponse<{ posts: GhostPost[] }>;
    });
  }

  async createPost(data: any): Promise<AxiosResponse<{ posts: GhostPost[] }>> {
    return this.queueRequest(async () => {
      const post = await this.adminApi.posts.add(data);
      return { data: { posts: [post] } } as AxiosResponse<{ posts: GhostPost[] }>;
    });
  }

  async updatePost(id: string, data: any): Promise<AxiosResponse<{ posts: GhostPost[] }>> {
    return this.queueRequest(async () => {
      const post = await this.adminApi.posts.edit({ ...data, id });
      return { data: { posts: [post] } } as AxiosResponse<{ posts: GhostPost[] }>;
    });
  }

  async deletePost(id: string): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      await this.adminApi.posts.delete({ id });
      return { data: {} } as AxiosResponse<any>;
    });
  }

  async searchPosts(query: string, params?: any): Promise<AxiosResponse<GhostPostsResponse>> {
    // Search is implemented as a filtered browse
    return this.getPosts({ ...params, filter: `title:~'${query}' OR slug:~'${query}'` });
  }

  async bulkUpdatePosts(filter: string, data: any): Promise<AxiosResponse<GhostBulkOperationResponse>> {
    // Note: Bulk operations require custom implementation as they're not in the SDK
    return this.queueRequest(async () => {
      const response = await this.axiosClient.put('/posts/bulk/', {
        bulk: {
          action: 'updatePosts',
          meta: { filter, data },
        },
      });
      return response as AxiosResponse<GhostBulkOperationResponse>;
    });
  }

  async bulkDeletePosts(filter: string): Promise<AxiosResponse<GhostBulkOperationResponse>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.delete('/posts/', {
        data: { filter },
      });
      return response as AxiosResponse<GhostBulkOperationResponse>;
    });
  }

  // Pages
  async getPages(params?: any): Promise<AxiosResponse<GhostPagesResponse>> {
    return this.queueRequest(async () => {
      const pages = await this.contentApi.pages.browse({
        ...params,
        include: params?.include?.split(','),
      });
      return { data: pages } as AxiosResponse<GhostPagesResponse>;
    });
  }

  async getPage(id: string, params?: any): Promise<AxiosResponse<{ pages: GhostPage[] }>> {
    return this.queueRequest(async () => {
      const page = await this.contentApi.pages.read({ id }, {
        ...params,
        include: params?.include?.split(','),
      });
      return { data: { pages: [page] } } as AxiosResponse<{ pages: GhostPage[] }>;
    });
  }

  async getPageBySlug(slug: string, params?: any): Promise<AxiosResponse<{ pages: GhostPage[] }>> {
    return this.queueRequest(async () => {
      const page = await this.contentApi.pages.read({ slug }, {
        ...params,
        include: params?.include?.split(','),
      });
      return { data: { pages: [page] } } as AxiosResponse<{ pages: GhostPage[] }>;
    });
  }

  async createPage(data: any): Promise<AxiosResponse<{ pages: GhostPage[] }>> {
    return this.queueRequest(async () => {
      const page = await this.adminApi.pages.add(data);
      return { data: { pages: [page] } } as AxiosResponse<{ pages: GhostPage[] }>;
    });
  }

  async updatePage(id: string, data: any): Promise<AxiosResponse<{ pages: GhostPage[] }>> {
    return this.queueRequest(async () => {
      const page = await this.adminApi.pages.edit({ ...data, id });
      return { data: { pages: [page] } } as AxiosResponse<{ pages: GhostPage[] }>;
    });
  }

  async deletePage(id: string): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      await this.adminApi.pages.delete({ id });
      return { data: {} } as AxiosResponse<any>;
    });
  }

  // Members
  async getMembers(params?: any): Promise<AxiosResponse<GhostMembersResponse>> {
    return this.queueRequest(async () => {
      const members = await this.adminApi.members.browse(params);
      return { data: members } as AxiosResponse<GhostMembersResponse>;
    });
  }

  async getMember(id: string, params?: any): Promise<AxiosResponse<{ members: GhostMember[] }>> {
    return this.queueRequest(async () => {
      const member = await this.adminApi.members.read({ id }, params);
      return { data: { members: [member] } } as AxiosResponse<{ members: GhostMember[] }>;
    });
  }

  async getMemberByEmail(email: string, params?: any): Promise<AxiosResponse<{ members: GhostMember[] }>> {
    return this.queueRequest(async () => {
      const member = await this.adminApi.members.read({ email }, params);
      return { data: { members: [member] } } as AxiosResponse<{ members: GhostMember[] }>;
    });
  }

  async createMember(data: any): Promise<AxiosResponse<{ members: GhostMember[] }>> {
    return this.queueRequest(async () => {
      const member = await this.adminApi.members.add(data);
      return { data: { members: [member] } } as AxiosResponse<{ members: GhostMember[] }>;
    });
  }

  async updateMember(id: string, data: any): Promise<AxiosResponse<{ members: GhostMember[] }>> {
    return this.queueRequest(async () => {
      const member = await this.adminApi.members.edit({ ...data, id });
      return { data: { members: [member] } } as AxiosResponse<{ members: GhostMember[] }>;
    });
  }

  async deleteMember(id: string): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      await this.adminApi.members.delete({ id });
      return { data: {} } as AxiosResponse<any>;
    });
  }

  async importMembers(data: any): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.post('/members/upload/', data);
      return response;
    });
  }

  // Tags
  async getTags(params?: any): Promise<AxiosResponse<GhostTagsResponse>> {
    return this.queueRequest(async () => {
      const tags = await this.contentApi.tags.browse(params);
      return { data: tags } as AxiosResponse<GhostTagsResponse>;
    });
  }

  async getTag(id: string, params?: any): Promise<AxiosResponse<{ tags: GhostTag[] }>> {
    return this.queueRequest(async () => {
      const tag = await this.contentApi.tags.read({ id }, params);
      return { data: { tags: [tag] } } as AxiosResponse<{ tags: GhostTag[] }>;
    });
  }

  async getTagBySlug(slug: string, params?: any): Promise<AxiosResponse<{ tags: GhostTag[] }>> {
    return this.queueRequest(async () => {
      const tag = await this.contentApi.tags.read({ slug }, params);
      return { data: { tags: [tag] } } as AxiosResponse<{ tags: GhostTag[] }>;
    });
  }

  async createTag(data: any): Promise<AxiosResponse<{ tags: GhostTag[] }>> {
    return this.queueRequest(async () => {
      const tag = await this.adminApi.tags.add(data);
      return { data: { tags: [tag] } } as AxiosResponse<{ tags: GhostTag[] }>;
    });
  }

  async updateTag(id: string, data: any): Promise<AxiosResponse<{ tags: GhostTag[] }>> {
    return this.queueRequest(async () => {
      const tag = await this.adminApi.tags.edit({ ...data, id });
      return { data: { tags: [tag] } } as AxiosResponse<{ tags: GhostTag[] }>;
    });
  }

  async deleteTag(id: string): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      await this.adminApi.tags.delete({ id });
      return { data: {} } as AxiosResponse<any>;
    });
  }

  // Tiers
  async getTiers(params?: any): Promise<AxiosResponse<GhostTiersResponse>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get('/tiers/', { params });
      return response as AxiosResponse<GhostTiersResponse>;
    });
  }

  async getTier(id: string): Promise<AxiosResponse<{ tiers: GhostTier[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get(`/tiers/${id}/`);
      return response as AxiosResponse<{ tiers: GhostTier[] }>;
    });
  }

  async createTier(data: any): Promise<AxiosResponse<{ tiers: GhostTier[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.post('/tiers/', { tiers: [data] });
      return response as AxiosResponse<{ tiers: GhostTier[] }>;
    });
  }

  async updateTier(id: string, data: any): Promise<AxiosResponse<{ tiers: GhostTier[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.put(`/tiers/${id}/`, { tiers: [data] });
      return response as AxiosResponse<{ tiers: GhostTier[] }>;
    });
  }

  async archiveTier(id: string): Promise<AxiosResponse<{ tiers: GhostTier[] }>> {
    return this.updateTier(id, { active: false });
  }

  // Newsletters
  async getNewsletters(params?: any): Promise<AxiosResponse<GhostNewslettersResponse>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get('/newsletters/', { params });
      return response as AxiosResponse<GhostNewslettersResponse>;
    });
  }

  async getNewsletter(id: string): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get(`/newsletters/${id}/`);
      return response as AxiosResponse<{ newsletters: GhostNewsletter[] }>;
    });
  }

  async createNewsletter(data: any): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.post('/newsletters/', { newsletters: [data] });
      return response as AxiosResponse<{ newsletters: GhostNewsletter[] }>;
    });
  }

  async updateNewsletter(id: string, data: any): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.put(`/newsletters/${id}/`, { newsletters: [data] });
      return response as AxiosResponse<{ newsletters: GhostNewsletter[] }>;
    });
  }

  async archiveNewsletter(id: string): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>> {
    return this.updateNewsletter(id, { status: 'archived' });
  }

  // Users
  async getUsers(params?: any): Promise<AxiosResponse<GhostUsersResponse>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get('/users/', { params });
      return response as AxiosResponse<GhostUsersResponse>;
    });
  }

  async getUser(id: string, params?: any): Promise<AxiosResponse<{ users: GhostUser[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get(`/users/${id}/`, { params });
      return response as AxiosResponse<{ users: GhostUser[] }>;
    });
  }

  async getCurrentUser(): Promise<AxiosResponse<{ users: GhostUser[] }>> {
    return this.getUser('me');
  }

  async updateUser(id: string, data: any): Promise<AxiosResponse<{ users: GhostUser[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.put(`/users/${id}/`, { users: [data] });
      return response as AxiosResponse<{ users: GhostUser[] }>;
    });
  }

  // Settings
  async getSettings(): Promise<AxiosResponse<GhostSettingsResponse>> {
    return this.queueRequest(async () => {
      const settings = await this.contentApi.settings.browse();
      return { data: { settings } } as AxiosResponse<GhostSettingsResponse>;
    });
  }

  async updateSettings(settings: any): Promise<AxiosResponse<GhostSettingsResponse>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.put('/settings/', { settings });
      return response as AxiosResponse<GhostSettingsResponse>;
    });
  }

  // Media
  async uploadImage(data: any): Promise<AxiosResponse<{ images: Array<{ url: string; ref?: string }> }>> {
    return this.queueRequest(async () => {
      const response = await this.adminApi.images.upload(data);
      return { data: { images: [response] } } as AxiosResponse;
    });
  }

  async uploadMedia(data: any): Promise<AxiosResponse<{ media: Array<{ url: string; ref?: string }> }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.post('/media/upload/', data);
      return response;
    });
  }

  // Themes
  async uploadTheme(data: any): Promise<AxiosResponse<{ themes: any[] }>> {
    return this.queueRequest(async () => {
      const response = await this.adminApi.themes.upload(data);
      return { data: { themes: [response] } } as AxiosResponse;
    });
  }

  async activateTheme(name: string): Promise<AxiosResponse<{ themes: any[] }>> {
    return this.queueRequest(async () => {
      const response = await this.adminApi.themes.activate(name);
      return { data: { themes: [response] } } as AxiosResponse;
    });
  }

  async deleteTheme(name: string): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      await this.adminApi.themes.delete(name);
      return { data: {} } as AxiosResponse;
    });
  }

  // Webhooks
  async getWebhooks(): Promise<AxiosResponse<{ webhooks: any[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get('/webhooks/');
      return response;
    });
  }

  async createWebhook(data: any): Promise<AxiosResponse<{ webhooks: any[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.post('/webhooks/', { webhooks: [data] });
      return response;
    });
  }

  async updateWebhook(id: string, data: any): Promise<AxiosResponse<{ webhooks: any[] }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.put(`/webhooks/${id}/`, { webhooks: [data] });
      return response;
    });
  }

  async deleteWebhook(id: string): Promise<AxiosResponse<any>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.delete(`/webhooks/${id}/`);
      return response;
    });
  }

  // Site
  async getSite(): Promise<AxiosResponse<{ site: any }>> {
    return this.queueRequest(async () => {
      const response = await this.axiosClient.get('/site/');
      return response;
    });
  }
}