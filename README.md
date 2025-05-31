# SpreadStation Frontend

Web-based administration interface for SpreadStation Backend built with React, TypeScript, and Vite.

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- SpreadStation Backend running on `http://localhost:8000`
- At least one AI API key for TaskMaster (see setup below)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `env.example` to `.env.local` and add your API keys:
```bash
cp env.example .env.local
```

Edit `.env.local` with your actual API keys:
```env
# Frontend
VITE_API_BASE_URL=http://localhost:8000/api/v1

# TaskMaster AI (at least one required)
ANTHROPIC_API_KEY=your_actual_anthropic_key
OPENAI_API_KEY=your_actual_openai_key
```

### 3. TaskMaster MCP Setup

TaskMaster is already configured in `.cursor/mcp.json`. To activate it:

1. **Update API Keys**: Edit `.cursor/mcp.json` and replace the placeholder API keys with your real ones
2. **Enable in Cursor**: 
   - Open Cursor Settings (`Ctrl+Shift+J`)
   - Click on "MCP" tab on the left
   - Enable "taskmaster-ai" with the toggle
3. **Initialize TaskMaster**: In Cursor's AI chat, say:
   ```
   Initialize taskmaster-ai in my project
   ```

### 4. Start Development
```bash
npm run dev
```

## TaskMaster Usage

Once TaskMaster is set up, you can use it in Cursor's AI chat:

- **Parse PRD**: `Can you parse my PRD at scripts/prd.txt?`
- **Plan next step**: `What's the next task I should work on?`
- **Implement task**: `Can you help me implement task 3?`
- **Expand task**: `Can you help me expand task 4?`

## Project Structure

```
spreadstation-frontend/
├── .cursor/
│   └── mcp.json              # TaskMaster MCP configuration
├── scripts/
│   └── prd.txt               # TaskMaster-compatible PRD
├── src/                      # Source code (to be created)
├── spreadstation-frontend-prd.md  # Detailed PRD
├── env.example               # Environment variables template
└── README.md                 # This file
```

## Backend Dependencies

Ensure the SpreadStation Backend is running with these endpoints:
- Authentication: `/api/v1/auth/*`
- Instruments: `/api/v1/admin/instruments/*`
- Exchanges: `/api/v1/admin/exchanges/*`
- Data ingestion: `/api/v1/admin/data/*`
- Jobs: `/api/v1/admin/jobs/*`
- System: `/api/v1/health`, `/api/v1/status/*`

## Getting API Keys

### Anthropic (Claude)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account and get API key from dashboard

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account and get API key from API keys section

### Perplexity (Optional, for research)
1. Go to [perplexity.ai](https://perplexity.ai)
2. Sign up and get API key from settings

## Next Steps

1. Set up your API keys in `.cursor/mcp.json`
2. Enable TaskMaster in Cursor settings
3. Initialize TaskMaster in the AI chat
4. Start implementing tasks from the PRD! 