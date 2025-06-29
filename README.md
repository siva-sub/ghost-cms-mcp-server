# Ghost CMS MCP Server

[![NPM Version](https://img.shields.io/npm/v/ghost-cms-mcp-server?style=flat-square&color=blue)](https://www.npmjs.com/package/ghost-cms-mcp-server)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/siva-sub/ghost-cms-mcp-server/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![CI Status](https://img.shields.io/github/actions/workflow/status/siva-sub/ghost-cms-mcp-server/ci.yml?branch=main&style=flat-square)](https://github.com/siva-sub/ghost-cms-mcp-server/actions)

A comprehensive **Model Context Protocol (MCP) server** for Ghost CMS that provides full automation capabilities for Ghost blogs through AI assistants like Claude Desktop, Cursor, and other MCP-compatible clients.

> **Developed by [Sivasubramanian Ramanathan](https://sivasub.com) | [hello@sivasub.com](mailto:hello@sivasub.com)**  
> **Product Owner | Innovation Catalyst | FinTech Leader** at Bank for International Settlements Innovation Hub, Singapore  
> 
> This project demonstrates technical innovation and product thinking skills, bridging the gap between complex technology (Model Context Protocol) and practical business applications (content management automation). Built as a showcase of cross-functional capabilities in product development, from conception to delivery.

## ✨ Key Features

- 🚀 **Complete Ghost CMS Integration** - Full CRUD operations for posts, pages, members, and more
- 🔐 **Enterprise Security** - JWT authentication with proper error handling and validation
- ⚡ **Smart Performance** - Built-in rate limiting, caching, and queue management
- 🎯 **Bulk Operations** - Efficient mass content updates and member management
- 📊 **Production Ready** - Comprehensive testing, CI/CD pipeline, and NPM distribution
- 🤖 **AI-First Design** - Native integration with Claude, Cursor, and MCP-compatible tools

## 📦 Quick Installation

### For Claude Desktop

**macOS/Linux:**
```bash
npm install -g ghost-cms-mcp-server
```

Add to your Claude Desktop configuration:
```json
{
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
}
```

**Windows (PowerShell):**
```powershell
npm install -g ghost-cms-mcp-server
# Add similar configuration to %APPDATA%\Claude\claude_desktop_config.json
```

### For Claude Code CLI
```bash
claude mcp add ghost-cms -- npx -y ghost-cms-mcp-server
```

## ⚙️ Configuration

### Required Environment Variables

```bash
GHOST_URL=https://your-site.ghost.io
GHOST_ADMIN_API_KEY=your-admin-key-id:your-admin-secret
GHOST_CONTENT_API_KEY=your-content-api-key
```

### Getting Your Ghost API Keys

1. Go to your Ghost Admin panel → **Integrations**
2. Click **Add custom integration**
3. Copy the **Admin API Key** (format: `id:secret`)
4. Copy the **Content API Key**
5. Use your Ghost site URL

## 🛠️ Available Operations

### Content Management
- **Posts**: Create, read, update, delete, publish, search, bulk operations
- **Pages**: Full CRUD operations for static pages
- **Media**: Upload images and files directly through the MCP interface

### Audience Management
- **Members**: Create, update, import/export subscriber lists
- **Tags**: Organize content with custom tagging systems
- **Newsletters**: Manage email campaigns and subscriber segments

### Site Administration
- **Settings**: Update site configuration and preferences
- **Users**: Manage authors and admin accounts
- **Tiers**: Configure membership and subscription options

### Advanced Features
- **Bulk Operations**: Mass update or delete content with safety confirmations
- **Search & Filtering**: Advanced query capabilities with Ghost's filter syntax
- **Real-time Sync**: Immediate updates with conflict resolution

## 📋 Usage Examples

### Create a Blog Post
```javascript
// Through your AI assistant using the ghost_posts_create tool
{
  "title": "Product Strategy in FinTech Innovation",
  "html": "<p>Insights from working at the BIS Innovation Hub...</p>",
  "status": "published",
  "tags": ["fintech", "product-management", "innovation"],
  "meta_title": "FinTech Product Strategy Guide",
  "featured": true
}
```

### Bulk Content Management
```javascript
// Update multiple posts at once
{
  "filter": "status:draft+created_at:>2024-01-01",
  "data": {
    "status": "published",
    "tags": ["updated-content"]
  }
}
```

### Member Management
```javascript
// Add new newsletter subscribers
{
  "email": "subscriber@example.com",
  "name": "New Subscriber",
  "labels": ["newsletter", "fintech-insights"],
  "subscribed": true
}
```

## 🧪 Technical Implementation

### Architecture Highlights
- **TypeScript**: Full type safety with strict mode enabled
- **Test-Driven Development**: Comprehensive Jest test suite with >80% coverage
- **Error Handling**: Proper error boundaries with detailed messaging
- **Performance**: Request queuing, rate limiting, and intelligent caching
- **Security**: API key protection and input validation

### Development Workflow
```bash
# Local development
git clone https://github.com/siva-sub/ghost-cms-mcp-server.git
cd ghost-cms-mcp-server
npm install
npm run dev

# Testing
npm test                 # Run all tests
npm run test:coverage    # Generate coverage reports
npm run lint            # Code quality checks
```

## 🎯 Product Innovation Showcase

This project demonstrates key product development skills:

**🔍 Problem Identification**: Recognized the gap between powerful Ghost CMS APIs and AI assistant capabilities

**🚀 Solution Design**: Created a bridge that makes content management conversational and intuitive

**⚖️ Technical Trade-offs**: Balanced feature completeness with performance and security considerations

**📊 User Experience**: Designed intuitive tool interfaces that work naturally with AI conversation flows

**🔄 Iterative Development**: Built with modularity to enable rapid feature expansion and adaptation

## 👨‍💼 About the Creator

**Sivasubramanian Ramanathan** is a Product Owner and Innovation Catalyst at the Bank for International Settlements Innovation Hub in Singapore, specializing in FinTech innovation, CBDC research, and regulatory technology solutions.

### Professional Focus Areas:
- **Product Strategy**: End-to-end product management from conception to delivery
- **FinTech Innovation**: CBDC design, digital finance, and regulatory technology
- **Stakeholder Management**: Coordinating with 19+ central banks and regulatory authorities
- **Technical Leadership**: Bridging business requirements with engineering implementation

### Certifications:
- **PMP®** - Project Management Professional
- **PSM II** - Professional Scrum Master II  
- **PSPO II** - Professional Scrum Product Owner II

### Connect:
- 🌐 **Website**: [sivasub.com](https://sivasub.com)
- 💼 **GitHub**: [@siva-sub](https://github.com/siva-sub)
- 📧 **Email**: [hello@sivasub.com](mailto:hello@sivasub.com)
- 📱 **LinkedIn**: [LinkedIn Profile](https://linkedin.com/in/sivasubramanian-ramanathan)
- 📍 **Location**: Singapore

### Recent Publications:
- *Project Viridis: A Blueprint for Managing Climate-Related Financial Risk* (BIS Innovation Hub, 2024)
- *GenAI in Action: Transforming Data Use in SupTech* (Irving Fisher Committee, 2025)
- *Novel Approaches to Combat Money Laundering* (OMFIF Sustainable Policy Institute, 2024)

## 📄 License

MIT License - feel free to use this project as inspiration for your own technical innovations.

---

**Built by a Product Owner who codes** – demonstrating the intersection of business strategy and technical execution.

[⭐ Star this repository](https://github.com/siva-sub/ghost-cms-mcp-server) to show your support for product-driven development!