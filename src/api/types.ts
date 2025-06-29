import { AxiosResponse } from 'axios';
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

export interface GhostAPIConfig {
  url: string;
  adminApiKey: string;
  contentApiKey: string;
}

export interface GhostAPIClientInterface {
  // Posts
  getPosts(params?: any): Promise<AxiosResponse<GhostPostsResponse>>;
  getPost(id: string, params?: any): Promise<AxiosResponse<{ posts: GhostPost[] }>>;
  getPostBySlug(slug: string, params?: any): Promise<AxiosResponse<{ posts: GhostPost[] }>>;
  createPost(data: any): Promise<AxiosResponse<{ posts: GhostPost[] }>>;
  updatePost(id: string, data: any): Promise<AxiosResponse<{ posts: GhostPost[] }>>;
  deletePost(id: string): Promise<AxiosResponse<any>>;
  searchPosts(query: string, params?: any): Promise<AxiosResponse<GhostPostsResponse>>;
  bulkUpdatePosts(filter: string, data: any): Promise<AxiosResponse<GhostBulkOperationResponse>>;
  bulkDeletePosts(filter: string): Promise<AxiosResponse<GhostBulkOperationResponse>>;

  // Pages
  getPages(params?: any): Promise<AxiosResponse<GhostPagesResponse>>;
  getPage(id: string, params?: any): Promise<AxiosResponse<{ pages: GhostPage[] }>>;
  getPageBySlug(slug: string, params?: any): Promise<AxiosResponse<{ pages: GhostPage[] }>>;
  createPage(data: any): Promise<AxiosResponse<{ pages: GhostPage[] }>>;
  updatePage(id: string, data: any): Promise<AxiosResponse<{ pages: GhostPage[] }>>;
  deletePage(id: string): Promise<AxiosResponse<any>>;

  // Members
  getMembers(params?: any): Promise<AxiosResponse<GhostMembersResponse>>;
  getMember(id: string, params?: any): Promise<AxiosResponse<{ members: GhostMember[] }>>;
  getMemberByEmail(email: string, params?: any): Promise<AxiosResponse<{ members: GhostMember[] }>>;
  createMember(data: any): Promise<AxiosResponse<{ members: GhostMember[] }>>;
  updateMember(id: string, data: any): Promise<AxiosResponse<{ members: GhostMember[] }>>;
  deleteMember(id: string): Promise<AxiosResponse<any>>;
  importMembers(data: any): Promise<AxiosResponse<any>>;

  // Tags
  getTags(params?: any): Promise<AxiosResponse<GhostTagsResponse>>;
  getTag(id: string, params?: any): Promise<AxiosResponse<{ tags: GhostTag[] }>>;
  getTagBySlug(slug: string, params?: any): Promise<AxiosResponse<{ tags: GhostTag[] }>>;
  createTag(data: any): Promise<AxiosResponse<{ tags: GhostTag[] }>>;
  updateTag(id: string, data: any): Promise<AxiosResponse<{ tags: GhostTag[] }>>;
  deleteTag(id: string): Promise<AxiosResponse<any>>;

  // Tiers
  getTiers(params?: any): Promise<AxiosResponse<GhostTiersResponse>>;
  getTier(id: string): Promise<AxiosResponse<{ tiers: GhostTier[] }>>;
  createTier(data: any): Promise<AxiosResponse<{ tiers: GhostTier[] }>>;
  updateTier(id: string, data: any): Promise<AxiosResponse<{ tiers: GhostTier[] }>>;
  archiveTier(id: string): Promise<AxiosResponse<{ tiers: GhostTier[] }>>;

  // Newsletters
  getNewsletters(params?: any): Promise<AxiosResponse<GhostNewslettersResponse>>;
  getNewsletter(id: string): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>>;
  createNewsletter(data: any): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>>;
  updateNewsletter(id: string, data: any): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>>;
  archiveNewsletter(id: string): Promise<AxiosResponse<{ newsletters: GhostNewsletter[] }>>;

  // Users
  getUsers(params?: any): Promise<AxiosResponse<GhostUsersResponse>>;
  getUser(id: string, params?: any): Promise<AxiosResponse<{ users: GhostUser[] }>>;
  getCurrentUser(): Promise<AxiosResponse<{ users: GhostUser[] }>>;
  updateUser(id: string, data: any): Promise<AxiosResponse<{ users: GhostUser[] }>>;

  // Settings
  getSettings(): Promise<AxiosResponse<GhostSettingsResponse>>;
  updateSettings(settings: any): Promise<AxiosResponse<GhostSettingsResponse>>;

  // Media
  uploadImage(data: any): Promise<AxiosResponse<{ images: Array<{ url: string; ref?: string }> }>>;
  uploadMedia(data: any): Promise<AxiosResponse<{ media: Array<{ url: string; ref?: string }> }>>;

  // Themes
  uploadTheme(data: any): Promise<AxiosResponse<{ themes: any[] }>>;
  activateTheme(name: string): Promise<AxiosResponse<{ themes: any[] }>>;
  deleteTheme(name: string): Promise<AxiosResponse<any>>;

  // Webhooks
  getWebhooks(): Promise<AxiosResponse<{ webhooks: any[] }>>;
  createWebhook(data: any): Promise<AxiosResponse<{ webhooks: any[] }>>;
  updateWebhook(id: string, data: any): Promise<AxiosResponse<{ webhooks: any[] }>>;
  deleteWebhook(id: string): Promise<AxiosResponse<any>>;

  // Site
  getSite(): Promise<AxiosResponse<{ site: any }>>;
}