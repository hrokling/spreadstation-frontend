# SpreadStation Frontend

A modern React-based web administration interface for the SpreadStation Backend system, providing comprehensive market data and financial instrument management capabilities.

## 🚀 Features

- **Instrument Management**: Create, edit, and manage financial instruments
- **Data Ingestion Control**: Monitor and control market data ingestion processes
- **Real-time Dashboard**: Live monitoring of system status and data flows
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Modern UI built with Mantine components
- **Type Safety**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 6.x for fast development and optimized builds
- **UI Library**: Mantine 8.x for modern, accessible components
- **Routing**: React Router v6 for client-side navigation
- **State Management**: Zustand for lightweight, scalable state management
- **Data Fetching**: TanStack Query (React Query) for server state management
- **HTTP Client**: Axios for API communication
- **Code Quality**: ESLint + Prettier for consistent code style
- **Task Management**: TaskMaster AI for project organization

## 📋 Prerequisites

- Node.js 18+ and npm
- Access to SpreadStation Backend API
- Modern web browser with ES2020+ support

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/hrokling/spreadstation-frontend.git
cd spreadstation-frontend
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Application Configuration
VITE_APP_NAME=SpreadStation Frontend
VITE_APP_VERSION=0.1.0

# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_JWT_STORAGE_KEY=spreadstation_token
VITE_JWT_REFRESH_KEY=spreadstation_refresh_token

# Features
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=false
VITE_LOG_LEVEL=debug
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build for production                     |
| `npm run preview`      | Preview production build locally         |
| `npm run lint`         | Run ESLint to check code quality         |
| `npm run lint:fix`     | Auto-fix ESLint issues                   |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |

## 📁 Project Structure

```
src/
├── api/           # API integration and HTTP client setup
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components and routing
├── store/         # Zustand state management stores
├── types/         # TypeScript type definitions
├── utils/         # Utility functions and helpers
├── App.tsx        # Main application component
└── main.tsx       # Application entry point

tasks/             # TaskMaster AI task management
scripts/           # Build and deployment scripts
public/            # Static assets
```

## 🔧 Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the frontend.

### Application Configuration

- `VITE_APP_NAME`: Application display name
- `VITE_APP_VERSION`: Current application version

### API Configuration

- `VITE_API_BASE_URL`: SpreadStation Backend API base URL
- `VITE_API_TIMEOUT`: Request timeout in milliseconds

### Authentication

- `VITE_JWT_STORAGE_KEY`: Local storage key for JWT tokens
- `VITE_JWT_REFRESH_KEY`: Local storage key for refresh tokens

### Development Features

- `VITE_ENABLE_DEBUG`: Enable debug logging and features
- `VITE_ENABLE_MOCK_DATA`: Use mock data instead of real API calls
- `VITE_LOG_LEVEL`: Logging level (debug, info, warn, error)

## 🏗️ Development Workflow

### Code Quality

- **ESLint**: Configured with React, TypeScript, and Prettier rules
- **Prettier**: Enforces consistent code formatting
- **TypeScript**: Strict mode enabled for maximum type safety

### Git Workflow

1. Create feature branches from `main`
2. Make changes following the established patterns
3. Run `npm run lint` and `npm run format` before committing
4. Create pull requests for code review

### Component Development

- Use functional components with hooks
- Implement proper TypeScript typing
- Follow Mantine design system patterns
- Write reusable, composable components

## 🔐 Authentication

The application uses JWT-based authentication with the SpreadStation Backend:

1. **Login**: POST to `/auth/login` with credentials
2. **Token Storage**: JWT stored in localStorage
3. **Auto-refresh**: Automatic token refresh before expiration
4. **Route Protection**: Private routes require valid authentication

## 📊 State Management

### Zustand Stores

- **Auth Store**: User authentication state and actions
- **Instrument Store**: Financial instrument data and operations
- **UI Store**: Application UI state and preferences

### TanStack Query

- Server state caching and synchronization
- Automatic background refetching
- Optimistic updates for better UX

## 🎨 UI Components

Built with Mantine UI library providing:

- **Consistent Design**: Modern, accessible component library
- **Dark/Light Themes**: Built-in theme switching
- **Responsive Layout**: Mobile-first responsive design
- **Form Handling**: Robust form validation and submission

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment-specific Builds

- **Development**: `npm run dev`
- **Staging**: Configure staging environment variables
- **Production**: Use production environment variables

### Static Hosting

The built application can be deployed to any static hosting service:

- Vercel, Netlify, AWS S3, etc.
- Ensure proper routing configuration for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the coding standards
4. Run tests and linting: `npm run lint && npm run format`
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is part of the SpreadStation system. See the main repository for license information.

## 🆘 Support

For questions and support:

- Check the [TaskMaster tasks](./tasks/) for current development status
- Review the [PRD document](./spreadstation-frontend-prd.md) for detailed requirements
- Contact the development team for technical assistance

---

**SpreadStation Frontend** - Modern financial data management interface
