// Ghost API Types

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  mobiledoc?: string;
  html?: string;
  status: 'published' | 'draft' | 'scheduled';
  visibility: 'public' | 'members' | 'paid' | 'tiers';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  custom_excerpt?: string | null;
  codeinjection_head?: string | null;
  codeinjection_foot?: string | null;
  custom_template?: string | null;
  canonical_url?: string | null;
  authors?: GhostAuthor[];
  tags?: GhostTag[];
  primary_author?: GhostAuthor;
  primary_tag?: GhostTag | null;
  featured: boolean;
  feature_image?: string | null;
  feature_image_alt?: string | null;
  feature_image_caption?: string | null;
  reading_time?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  twitter_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  email_recipient_filter?: string;
  newsletter?: GhostNewsletter;
  email?: GhostEmail | null;
}

export interface GhostPage extends Omit<GhostPost, 'email_recipient_filter' | 'newsletter' | 'email'> {
  page: true;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  email?: string;
  profile_image?: string | null;
  cover_image?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  url?: string;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  feature_image?: string | null;
  visibility: 'public' | 'internal';
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  twitter_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  codeinjection_head?: string | null;
  codeinjection_foot?: string | null;
  canonical_url?: string | null;
  accent_color?: string | null;
  created_at: string;
  updated_at: string;
  url?: string;
}

export interface GhostMember {
  id: string;
  uuid: string;
  email: string;
  name?: string | null;
  note?: string | null;
  geolocation?: string | null;
  subscribed: boolean;
  created_at: string;
  updated_at: string;
  labels?: GhostLabel[];
  subscriptions?: GhostSubscription[];
  avatar_image?: string | null;
  comped: boolean;
  email_count: number;
  email_opened_count: number;
  email_open_rate: number | null;
  status: 'free' | 'paid' | 'comped';
  last_seen_at: string | null;
  products?: GhostProduct[];
  newsletters?: GhostNewsletter[];
}

export interface GhostLabel {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface GhostSubscription {
  id: string;
  customer: {
    id: string;
    name: string | null;
    email: string;
  };
  status: string;
  start_date: string;
  default_payment_card_last4: string | null;
  cancel_at_period_end: boolean;
  cancellation_reason: string | null;
  current_period_end: string;
  price: {
    id: string;
    price_id: string;
    nickname: string;
    amount: number;
    interval: string;
    type: string;
    currency: string;
  };
  tier?: GhostTier;
}

export interface GhostProduct {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  welcome_page_url?: string | null;
  visibility: string;
  trial_days: number;
  description?: string | null;
  type: 'paid' | 'free';
  currency?: string | null;
  monthly_price?: number | null;
  yearly_price?: number | null;
  created_at: string;
  updated_at: string;
  monthly_price_id?: string | null;
  yearly_price_id?: string | null;
  benefits?: string[];
}

export interface GhostTier extends GhostProduct {}

export interface GhostNewsletter {
  id: string;
  uuid: string;
  name: string;
  description?: string | null;
  slug: string;
  sender_name?: string | null;
  sender_email?: string | null;
  sender_reply_to: string;
  status: 'active' | 'archived';
  visibility: 'members' | 'paid';
  subscribe_on_signup: boolean;
  sort_order: number;
  header_image?: string | null;
  show_header_icon: boolean;
  show_header_title: boolean;
  show_header_name: boolean;
  title_font_category: string;
  title_alignment: string;
  show_feature_image: boolean;
  body_font_category: string;
  footer_content?: string | null;
  show_badge: boolean;
  show_latest_posts: boolean;
  created_at: string;
  updated_at: string;
}

export interface GhostEmail {
  id: string;
  uuid: string;
  status: string;
  recipient_filter?: string | null;
  error?: string | null;
  error_data?: any;
  email_count: number;
  delivered_count: number;
  opened_count: number;
  clicked_count: number;
  failed_count: number;
  subject: string;
  from: string;
  reply_to?: string | null;
  html?: string;
  plaintext?: string;
  track_opens: boolean;
  track_clicks: boolean;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface GhostSiteSettings {
  title: string;
  description: string;
  logo?: string | null;
  icon?: string | null;
  accent_color?: string | null;
  cover_image?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  lang: string;
  timezone: string;
  codeinjection_head?: string | null;
  codeinjection_foot?: string | null;
  navigation: Array<{ label: string; url: string }>;
  secondary_navigation: Array<{ label: string; url: string }>;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  twitter_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  members_support_address: string;
  members_enabled: boolean;
  members_invite_only: boolean;
  stripe_publishable_key?: string | null;
  paid_members_enabled: boolean;
  members_track_sources: boolean;
  portal_name: boolean;
  portal_button: boolean;
  portal_plans: string[];
  portal_products: string[];
  mailgun_domain?: string | null;
  mailgun_api_key?: string | null;
  mailgun_base_url?: string | null;
  email_track_opens: boolean;
  email_track_clicks: boolean;
  active_timezone: string;
  default_locale: string;
}

export interface GhostUser {
  id: string;
  name: string;
  slug: string;
  email: string;
  profile_image?: string | null;
  cover_image?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  accessibility?: string | null;
  status: string;
  meta_title?: string | null;
  meta_description?: string | null;
  tour?: string | null;
  last_seen?: string | null;
  created_at: string;
  updated_at: string;
  roles?: GhostRole[];
  url?: string;
}

export interface GhostRole {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GhostWebhook {
  id: string;
  name: string;
  event: string;
  target_url: string;
  secret?: string;
  api_version: string;
  integration_id: string;
  status: string;
  last_triggered_at?: string | null;
  last_triggered_status?: string | null;
  last_triggered_error?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GhostTheme {
  name: string;
  package: {
    name?: string;
    description?: string;
    version?: string;
  };
  active: boolean;
  templates?: string[];
}

// API Response Types

export interface GhostListResponse<T = any> {
  data?: T;
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      next: number | null;
      prev: number | null;
    };
  };
}

export interface GhostPostsResponse extends GhostListResponse<GhostPost> {
  posts: GhostPost[];
}

export interface GhostPagesResponse extends GhostListResponse<GhostPage> {
  pages: GhostPage[];
}

export interface GhostMembersResponse extends GhostListResponse<GhostMember> {
  members: GhostMember[];
}

export interface GhostTagsResponse extends GhostListResponse<GhostTag> {
  tags: GhostTag[];
}

export interface GhostUsersResponse extends GhostListResponse<GhostUser> {
  users: GhostUser[];
}

export interface GhostNewslettersResponse extends GhostListResponse<GhostNewsletter> {
  newsletters: GhostNewsletter[];
}

export interface GhostTiersResponse extends GhostListResponse<GhostTier> {
  tiers: GhostTier[];
}

export interface GhostSettingsResponse {
  settings: GhostSiteSettings;
}

export interface GhostBulkOperationResponse {
  bulk: {
    meta: {
      stats: {
        successful: number;
        unsuccessful: number;
      };
    };
  };
}

// Error Response Types
export interface GhostErrorResponse {
  errors: Array<{
    message: string;
    context?: string | null;
    type?: string;
    details?: any;
    property?: string | null;
    help?: string | null;
    code?: string;
    id?: string;
  }>;
}