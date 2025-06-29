// Type declarations for Ghost packages that don't have @types
declare module '@tryghost/admin-api' {
  interface AdminAPIConfig {
    url: string;
    key: string;
    version: string;
  }

  interface PostData {
    title: string;
    slug?: string;
    mobiledoc?: string;
    html?: string;
    feature_image?: string;
    featured?: boolean;
    status?: 'draft' | 'published' | 'scheduled';
    published_at?: string;
    custom_excerpt?: string;
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
    og_title?: string;
    og_description?: string;
    twitter_image?: string;
    twitter_title?: string;
    twitter_description?: string;
    tags?: Array<string | { name: string; slug?: string }>;
    authors?: Array<string>;
    updated_at?: string;
  }

  interface QueryOptions {
    filter?: string;
    limit?: number;
    order?: string;
    include?: string;
    fields?: string;
    page?: number;
  }

  export default class GhostAdminAPI {
    constructor(config: AdminAPIConfig);
    
    posts: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: QueryOptions): Promise<any>;
      add(data: PostData, options?: QueryOptions): Promise<any>;
      edit(data: PostData & { id: string }, options?: QueryOptions): Promise<any>;
      delete(data: { id: string }): Promise<any>;
    };

    members: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string } | { email: string }, options?: QueryOptions): Promise<any>;
      add(data: any, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
      delete(data: { id: string }): Promise<any>;
    };

    pages: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: QueryOptions): Promise<any>;
      add(data: any, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
      delete(data: { id: string }): Promise<any>;
    };

    tags: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: QueryOptions): Promise<any>;
      add(data: any, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
      delete(data: { id: string }): Promise<any>;
    };

    settings: {
      read(): Promise<any>;
      edit(data: any): Promise<any>;
    };

    users: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
    };

    tiers: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string }, options?: QueryOptions): Promise<any>;
      add(data: any, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
    };

    newsletters: {
      browse(options?: QueryOptions): Promise<any>;
      read(data: { id: string }, options?: QueryOptions): Promise<any>;
      add(data: any, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
    };

    webhooks: {
      browse(options?: QueryOptions): Promise<any>;
      add(data: any, options?: QueryOptions): Promise<any>;
      edit(data: any, options?: QueryOptions): Promise<any>;
      delete(data: { id: string }): Promise<any>;
    };
  }
}

declare module '@tryghost/content-api' {
  interface ContentAPIConfig {
    url: string;
    key: string;
    version: string;
  }

  export default class GhostContentAPI {
    constructor(config: ContentAPIConfig);

    posts: {
      browse(options?: any): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: any): Promise<any>;
    };

    pages: {
      browse(options?: any): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: any): Promise<any>;
    };

    tags: {
      browse(options?: any): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: any): Promise<any>;
    };

    authors: {
      browse(options?: any): Promise<any>;
      read(data: { id: string } | { slug: string }, options?: any): Promise<any>;
    };

    settings: {
      browse(): Promise<any>;
    };

    tiers: {
      browse(options?: any): Promise<any>;
    };
  }
}