# Ghost CMS MCP Server

[![NPM Version](https://img.shields.io/npm/v/ghost-cms-mcp-server?style=flat-square&color=blue)](https://www.npmjs.com/package/ghost-cms-mcp-server)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/siva-sub/ghost-cms-mcp-server/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![CI Status](https://img.shields.io/github/actions/workflow/status/siva-sub/ghost-cms-mcp-server/ci.yml?branch=main&style=flat-square)](https://github.com/siva-sub/ghost-cms-mcp-server/actions)
[![Downloads](https://img.shields.io/npm/dm/ghost-cms-mcp-server?style=flat-square&color=green)](https://www.npmjs.com/package/ghost-cms-mcp-server)
[![GitHub Stars](https://img.shields.io/github/stars/siva-sub/ghost-cms-mcp-server?style=flat-square&color=yellow)](https://github.com/siva-sub/ghost-cms-mcp-server)

A comprehensive **Model Context Protocol (MCP) server** for Ghost CMS that provides full automation capabilities for Ghost blogs through AI assistants like Claude Desktop, Cursor, and other MCP-compatible clients.

> **Developed by [Sivasubramanian Ramanathan](https://github.com/siva-sub)** - Showcasing enterprise-grade TypeScript development, API integration, and modern tooling practices.

## ✨ Features

- 🚀 **Complete Ghost API Coverage** - All major Ghost operations supported
- 🔐 **Secure Authentication** - JWT tokens for Admin API, key-based for Content API
- ⚡ **Smart Rate Limiting** - Built-in queue management with exponential backoff
- 🎯 **Bulk Operations** - Efficient mass updates and deletions
- 📝 **Content Management** - Full CRUD for posts, pages, members, and more
- 🏷️ **Rich Metadata** - SEO optimization, social media, and custom fields
- 🧪 **Test-Driven Development** - Comprehensive test suite with Jest
- 📊 **TypeScript** - Full type safety and IntelliSense support
- 🔄 **Real-time Sync** - Instant updates and conflict resolution
- 🏗️ **Production Ready** - CI/CD pipeline, Docker support, NPM published

## 🛠️ Technical Stack

- **Runtime**: Node.js 18+ with ES Modules
- **Language**: TypeScript 5.0+ with strict type checking
- **Testing**: Jest with ES modules support and custom matchers
- **Linting**: ESLint with TypeScript rules and Prettier
- **Build**: TypeScript compiler with declaration maps
- **CI/CD**: GitHub Actions with multi-version testing
- **Package Management**: NPM with proper semver and engines

## 📦 Installation

### Quick Start

#### NPM (Recommended)
```bash
npm install -g ghost-cms-mcp-server
```

#### For Claude Desktop

**macOS/Linux:**
```bash
# Install package
npm install -g ghost-cms-mcp-server

# Add to Claude Desktop config
echo '{
  "mcpServers": {
    "ghost-cms": {
      "command": "npx",
      "args": ["-y", "ghost-cms-mcp-server"],
      "env": {
        "GHOST_URL": "https://your-site.ghost.io",
        "GHOST_ADMIN_API_KEY": "your-admin-key",
        "GHOST_CONTENT_API_KEY": "your-content-key"
      }
    }
  }
}' >> ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows (PowerShell):**
```powershell
# Install package
npm install -g ghost-cms-mcp-server

# Add to Claude Desktop config
$config = @{
  mcpServers = @{
    "ghost-cms" = @{
      command = "npx"
      args = @("-y", "ghost-cms-mcp-server")
      env = @{
        GHOST_URL = "https://your-site.ghost.io"
        GHOST_ADMIN_API_KEY = "your-admin-key"
        GHOST_CONTENT_API_KEY = "your-content-key"
      }
    }
  }
} | ConvertTo-Json -Depth 4

Add-Content -Path "$env:APPDATA\Claude\claude_desktop_config.json" -Value $config
```

#### For Claude Code CLI
```bash
# Linux/macOS/Windows
claude mcp add ghost-cms -- npx -y ghost-cms-mcp-server
```

#### For Cursor IDE
```bash
# Install globally
npm install -g ghost-cms-mcp-server

# Configure in Cursor settings
# Add MCP server configuration in Settings > Extensions > MCP
```

### Manual Installation

```bash
git clone https://github.com/siva-sub/ghost-cms-mcp-server.git
cd ghost-cms-mcp-server
npm install
npm run build
npm start
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Required
GHOST_URL=https://your-site.ghost.io
GHOST_ADMIN_API_KEY=your-admin-key-id:your-admin-secret
GHOST_CONTENT_API_KEY=your-content-api-key

# Optional Performance Settings
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000
CACHE_TTL_MS=300000
CACHE_ENABLED=true

# Optional Advanced Settings
MAX_RETRY_ATTEMPTS=3
RETRY_DELAY_MS=1000
MAX_RETRY_DELAY_MS=30000
ENABLE_BULK_OPERATIONS=true
BULK_OPERATION_LIMIT=100

# Logging
LOG_LEVEL=info
LOG_FILE=ghost-mcp.log
DEBUG=false
```

### Getting Ghost API Keys

1. **Go to Ghost Admin** → Integrations → Add custom integration
2. **Copy the Admin API Key** (format: `id:secret`)
3. **Copy the Content API Key** 
4. **Set your Ghost URL** (your site's URL)

## 🛠️ Available Tools

### 📝 Content Management

#### Posts
- `ghost_posts_list` - List posts with advanced filters
- `ghost_posts_get` - Get single post by ID or slug
- `ghost_posts_create` - Create new post with full metadata
- `ghost_posts_update` - Update existing post
- `ghost_posts_delete` - Delete post permanently
- `ghost_posts_publish` - Publish draft post with email options
- `ghost_posts_unpublish` - Convert published post to draft
- `ghost_posts_search` - Search posts by content
- `ghost_posts_bulk_update` - Mass update multiple posts
- `ghost_posts_bulk_delete` - Mass delete posts (with confirmation)

#### Pages
- `ghost_pages_list` - List all pages
- `ghost_pages_get` - Get single page
- `ghost_pages_create` - Create new page
- `ghost_pages_update` - Update existing page
- `ghost_pages_delete` - Delete page

### 👥 Member Management
- `ghost_members_list` - List members with filters
- `ghost_members_get` - Get member details
- `ghost_members_create` - Create new member
- `ghost_members_update` - Update member info
- `ghost_members_delete` - Delete member
- `ghost_members_import` - Bulk import members
- `ghost_members_export` - Export member data

### 🏷️ Content Organization
- `ghost_tags_list` - List all tags
- `ghost_tags_create` - Create new tag
- `ghost_tags_update` - Update tag details
- `ghost_tags_delete` - Delete tag

### 💰 Subscription Management
- `ghost_tiers_list` - List membership tiers
- `ghost_tiers_create` - Create new tier
- `ghost_tiers_update` - Update tier pricing/features
- `ghost_tiers_archive` - Archive tier

### 📧 Newsletter Management
- `ghost_newsletters_list` - List newsletters
- `ghost_newsletters_create` - Create newsletter
- `ghost_newsletters_update` - Update newsletter settings
- `ghost_newsletters_archive` - Archive newsletter

### 🖼️ Media Management
- `ghost_media_upload` - Upload images and files
- `ghost_media_upload_from_url` - Upload from URL

### ⚙️ Site Management
- `ghost_settings_get` - Get site settings
- `ghost_settings_update` - Update site configuration
- `ghost_users_list` - List users/authors
- `ghost_users_update` - Update user profiles
- `ghost_webhooks_create` - Create webhooks
- `ghost_site_info` - Get site information

## 📋 Usage Examples

### Create a Blog Post
```javascript
// Use the ghost_posts_create tool
{
  "title": "My Awesome Post",
  "html": "<p>This is my post content with <strong>formatting</strong>.</p>",
  "status": "published",
  "tags": ["technology", "tutorial"],
  "meta_title": "SEO Optimized Title",
  "meta_description": "This post teaches you amazing things.",
  "featured": true,
  "custom_excerpt": "A brief summary of the post...",
  "published_at": "2024-12-25T00:00:00.000Z"
}
```

### Bulk Update Posts
```javascript
// Use the ghost_posts_bulk_update tool
{
  "filter": "status:draft+created_at:>2024-01-01",
  "data": {
    "status": "published",
    "featured": true,
    "tags": ["bulk-updated"]
  }
}
```

### Search and Filter
```javascript
// Use the ghost_posts_list tool
{
  "filter": "status:published+featured:true",
  "order": "published_at desc",
  "limit": 10,
  "include": "tags,authors",
  "fields": "title,slug,published_at,featured"
}
```

### Create Member with Subscription
```javascript
// Use the ghost_members_create tool
{
  "email": "subscriber@example.com",
  "name": "New Subscriber",
  "labels": ["vip", "newsletter"],
  "note": "Premium subscriber",
  "subscribed": true,
  "comped": false
}
```

## 🧪 Testing

### Run Tests
```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# With coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Test Coverage
- **Unit Tests**: All tools and utilities
- **Integration Tests**: Full API workflows
- **E2E Tests**: Real Ghost API interactions
- **Performance Tests**: Rate limiting and caching
- **Security Tests**: Authentication and validation

## 🚀 Development

### Local Development
```bash
git clone https://github.com/siva-sub/ghost-cms-mcp-server.git
cd ghost-cms-mcp-server
npm install
cp .env.example .env
# Edit .env with your Ghost credentials
npm run dev
```

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Write tests for your changes
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Quality
```bash
npm run lint        # ESLint checking
npm run lint:fix    # Auto-fix issues
npm run format      # Prettier formatting
npm run build       # TypeScript compilation
```

## 🔧 Advanced Usage

### Custom Rate Limiting
```javascript
// Set custom rate limits per environment
process.env.RATE_LIMIT_MAX_REQUESTS = '200';
process.env.RATE_LIMIT_WINDOW_MS = '30000';
```

### Bulk Operations
```javascript
// Safe bulk operations with confirmation
{
  "filter": "status:draft+created_at:<2024-01-01",
  "confirm": true  // Required for destructive operations
}
```

### Error Handling
The server provides detailed error messages:
- **400**: Invalid request parameters
- **401**: Authentication failed
- **403**: Permission denied
- **404**: Resource not found
- **409**: Conflict (e.g., concurrent edit)
- **422**: Validation error
- **429**: Rate limit exceeded

## 📊 Performance & Monitoring

### Metrics
- Request rate limiting with queue management
- Automatic retry with exponential backoff
- Response caching for read operations
- Connection pooling for optimal throughput

### Logging
Structured logging with configurable levels:
```bash
LOG_LEVEL=debug    # error, warn, info, debug
LOG_FILE=ghost.log # Optional file output
```

## 🔒 Security

- **API Key Protection**: Keys never logged or exposed
- **Request Validation**: All inputs validated before API calls
- **Rate Limiting**: Prevents API abuse
- **Secure Defaults**: Conservative permissions and timeouts
- **Audit Trail**: Comprehensive logging of all operations

## 🤝 Community & Support

### Getting Help
- 📚 [Documentation](https://github.com/siva-sub/ghost-cms-mcp-server/wiki)
- 🐛 [Issue Tracker](https://github.com/siva-sub/ghost-cms-mcp-server/issues)
- 💬 [Discussions](https://github.com/siva-sub/ghost-cms-mcp-server/discussions)
- 📧 [Email Support](mailto:hello@sivasub.com)

### Related Projects
- [Ghost CMS](https://ghost.org) - The headless CMS platform
- [Model Context Protocol](https://modelcontextprotocol.io) - The protocol specification
- [Claude Desktop](https://claude.ai) - AI assistant with MCP support

## 👨‍💻 About the Developer

**Sivasubramanian Ramanathan** is a software engineer specializing in TypeScript, Node.js, and modern web technologies. This project demonstrates:

- **Enterprise TypeScript Development**: Strict typing, proper error handling, and scalable architecture
- **API Integration Excellence**: Complete REST API wrapper with rate limiting and caching
- **Test-Driven Development**: Comprehensive Jest test suite with custom matchers
- **DevOps & CI/CD**: GitHub Actions, automated testing, and NPM publishing
- **Documentation & UX**: Clear API design and extensive documentation

Connect with Siva:
- 🌐 Website: [sivasub.com](https://sivasub.com)
- 💼 GitHub: [@siva-sub](https://github.com/siva-sub)
- 📧 Email: [hello@sivasub.com](mailto:hello@sivasub.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The Ghost team for the excellent CMS platform
- Anthropic for the Model Context Protocol specification
- The open source community for tools and inspiration

---

**Built with precision and attention to detail**

[⭐ Star this repo](https://github.com/siva-sub/ghost-cms-mcp-server) if you find it useful!