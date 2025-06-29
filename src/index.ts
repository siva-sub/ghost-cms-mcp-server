#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { GhostAPIClient } from './api/client.js';
import { PostTools } from './tools/posts.js';
// import { PagesTools } from './tools/pages.js';
// import { MembersTools } from './tools/members.js';
// import { TagsTools } from './tools/tags.js';

const server = new Server(
  {
    name: 'ghost-cms-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Configuration from environment variables
const config = {
  url: process.env.GHOST_URL || '',
  adminApiKey: process.env.GHOST_ADMIN_API_KEY || '',
  contentApiKey: process.env.GHOST_CONTENT_API_KEY || '',
};

// Validate configuration
if (!config.url || !config.adminApiKey || !config.contentApiKey) {
  console.error('Missing required environment variables:');
  console.error('- GHOST_URL');
  console.error('- GHOST_ADMIN_API_KEY'); 
  console.error('- GHOST_CONTENT_API_KEY');
  process.exit(1);
}

// Initialize Ghost API client
const ghostClient = new GhostAPIClient(config);

// Initialize tool modules
const postTools = new PostTools(ghostClient);
// const pagesTools = new PagesTools(ghostClient);
// const membersTools = new MembersTools(ghostClient);
// const tagsTools = new TagsTools(ghostClient);

// Register tools
const allTools = [
  ...postTools.getTools(),
  // ...pagesTools.getTools(),
  // ...membersTools.getTools(),
  // ...tagsTools.getTools(),
];

server.setRequestHandler(ListToolsRequestSchema, () => {
  return {
    tools: allTools,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    // Route to appropriate tool handler
    if (name.startsWith('ghost_posts_')) {
      const handler = postTools.getHandler(name);
      if (!handler) {
        throw new Error(`Unknown tool: ${name}`);
      }
      const result = await handler(args || {});
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    }
    
    // TODO: Add other tool routing
    // if (name.startsWith('ghost_pages_')) { ... }
    // if (name.startsWith('ghost_members_')) { ... }
    // if (name.startsWith('ghost_tags_')) { ... }
    
    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Error executing tool ${name}:`, error);
    
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ghost CMS MCP server running on stdio');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
}

export { server, ghostClient };