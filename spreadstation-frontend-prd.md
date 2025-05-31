# SpreadStation Frontend PRD

## Project Overview

**Project**: SpreadStation Frontend
**Purpose**: Web-based administration interface for SpreadStation Backend  
**Goal**: Enable efficient management of market data, instruments, and system operations  
**Architecture**: React SPA consuming SpreadStation Backend REST API  
**Backend API**: `http://localhost:8000/api/v1/`

## Technical Stack

- React 18+ with TypeScript
- Vite build tool
- React Router v6
- Mantine UI components
- Zustand for global state
- TanStack Query for server state
- Axios for HTTP requests
- JWT authentication

## Development Environment Setup

### Prerequisites

- Backend running on `http://localhost:8000`
- Node.js 18+ and npm installed
- Docker Desktop (for backend services)

### Backend Services (Must be running)

```
├── API:         http://localhost:8000      # FastAPI backend
├── Swagger UI:  http://localhost:8000/docs # API documentation
├── PostgreSQL:  localhost:5432             # TimescaleDB
├── Redis:       localhost:6379             # Job queues
```

### Starting the Backend

```bash
cd ~/Projects/spreadstation-backend/docker
docker-compose up -d

# Verify backend is running:
curl http://localhost:8000/api/v1/health
```

### Frontend Development

```bash
cd ~/Projects/spreadstation-frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

### Environment Variables

Create `.env.local` in frontend root:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### CORS Configuration

Backend must allow frontend origin. Check backend `.env`:

```
CORS_ORIGINS=["http://localhost:5173"]
```

## Project Structure

```
spreadstation-frontend/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   └── ProtectedRoute/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   └── types/
│   │   │
│   │   └── admin/
│   │       ├── instruments/
│   │       │   ├── components/
│   │       │   │   ├── InstrumentTable/
│   │       │   │   ├── InstrumentForm/
│   │       │   │   ├── BulkImport/
│   │       │   │   └── InstrumentDetail/
│   │       │   ├── hooks/
│   │       │   ├── api/
│   │       │   └── types/
│   │       │
│   │       ├── exchanges/
│   │       │   ├── components/
│   │       │   │   ├── ExchangeTable/
│   │       │   │   ├── ExchangeForm/
│   │       │   │   └── HolidayCalendar/
│   │       │   ├── hooks/
│   │       │   └── api/
│   │       │
│   │       ├── data-ingestion/
│   │       │   ├── components/
│   │       │   │   ├── IngestionDashboard/
│   │       │   │   ├── DataFreshnessTable/
│   │       │   │   ├── BackfillForm/
│   │       │   │   └── QuickActions/
│   │       │   ├── hooks/
│   │       │   └── api/
│   │       │
│   │       ├── jobs/
│   │       │   ├── components/
│   │       │   │   ├── JobQueueMonitor/
│   │       │   │   ├── JobDetail/
│   │       │   │   └── JobStats/
│   │       │   ├── hooks/
│   │       │   └── api/
│   │       │
│   │       └── system/
│   │           ├── components/
│   │           │   ├── SystemHealth/
│   │           │   ├── DatabaseStats/
│   │           │   └── LogViewer/
│   │           └── api/
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── AdminLayout/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── Header/
│   │   │   ├── DataDisplay/
│   │   │   │   ├── DataTable/
│   │   │   │   ├── StatCard/
│   │   │   │   └── StatusBadge/
│   │   │   └── Feedback/
│   │   │       ├── ConfirmDialog/
│   │   │       ├── ErrorBoundary/
│   │   │       └── LoadingOverlay/
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth/
│   │   │   ├── usePagination/
│   │   │   └── useDebounce/
│   │   │
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   └── types.ts
│   │   │
│   │   └── utils/
│   │       ├── formatting/
│   │       ├── validation/
│   │       └── constants/
│   │
│   ├── store/
│   │   ├── authStore.ts
│   │   └── preferencesStore.ts
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── theme.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── .env.example
├── .env.local
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Core Admin Features

### 1. Authentication & Authorization

**Login System**

- Authenticates against `POST /api/v1/auth/login`
- Receives JWT access token and refresh token
- Stores tokens in localStorage
- Refresh token via `POST /api/v1/auth/refresh`
- Logout clears tokens and calls `POST /api/v1/auth/logout`

**Access Control**

- All admin routes require valid JWT token
- Token included in Authorization header: `Bearer {token}`
- 401 responses trigger token refresh attempt
- 403 responses show permission denied message

### 2. Instrument Management

**Instrument Table View**

- Fetches paginated data from `GET /api/v1/instruments`
- Query parameters: `page`, `limit`, `search`, `exchange_id`, `active`
- Displays instruments with metadata from backend response
- Sort parameters sent as `sort_by` and `sort_order`

**Individual Instrument Operations**

- Create: `POST /api/v1/admin/instruments`
- Read: `GET /api/v1/instruments/{id}`
- Update: `PUT /api/v1/admin/instruments/{id}`
- Delete: `DELETE /api/v1/admin/instruments/{id}`
- Toggle active: `PATCH /api/v1/admin/instruments/{id}/status`

**Bulk Operations**

- Import endpoint: `POST /api/v1/admin/instruments/bulk`
- Accepts CSV file upload via multipart/form-data
- Returns validation results and import summary

**Required Fields** (validated by backend)

- `instrument_ticker_eodhd`
- `instrument_name`
- `exchange_id`
- `currency_id`
- `instrument_class_id`

### 3. Exchange Management

**Exchange Administration**

- List: `GET /api/v1/exchanges`
- Create: `POST /api/v1/admin/exchanges`
- Update: `PUT /api/v1/admin/exchanges/{id}`
- Delete: `DELETE /api/v1/admin/exchanges/{id}`

**Holiday Calendar Management**

- List holidays: `GET /api/v1/exchanges/{id}/holidays`
- Add holiday: `POST /api/v1/admin/exchanges/{id}/holidays`
- Update holiday: `PUT /api/v1/admin/exchanges/{id}/holidays/{holiday_id}`
- Delete holiday: `DELETE /api/v1/admin/exchanges/{id}/holidays/{holiday_id}`
- Bulk import: `POST /api/v1/admin/exchanges/{id}/holidays/bulk`

### 4. Data Ingestion Control

**Ingestion Dashboard**

- Data freshness overview: `GET /api/v1/status/data-freshness`
- Returns instrument counts by freshness category
- Ingestion statistics: `GET /api/v1/admin/data/stats`

**Quick Actions**

- Fetch yesterday's EOD: `POST /api/v1/admin/data/fetch-eod` with `{"date": "yesterday"}`
- Fetch specific date: `POST /api/v1/admin/data/fetch-eod` with `{"date": "YYYY-MM-DD"}`
- Check missing data: `GET /api/v1/admin/data/gaps`

**Data Freshness Monitor**

- Stale instruments list: `GET /api/v1/admin/data/stale-instruments`
- Returns instruments with `last_updated` older than threshold
- Individual backfill: `POST /api/v1/admin/data/backfill`

**Historical Data Backfill**

- Submit backfill job: `POST /api/v1/admin/data/backfill`
- Request body includes:
  - `instrument_ids[]` (array)
  - `start_date`
  - `end_date`
  - `interval` (1day, 5min)
  - `priority` (high, normal, low)
- Returns job IDs for tracking

### 5. Job Queue Management

**Queue Overview**

- Queue stats: `GET /api/v1/admin/jobs/stats`
- Returns depths for all queues and processing rates

**Job Monitor**

- List jobs: `GET /api/v1/admin/jobs`
- Query parameters: `status`, `type`, `queue`, `page`, `limit`
- Auto-refresh by polling endpoint every 5 seconds

**Individual Job Operations**

- Get details: `GET /api/v1/admin/jobs/{id}`
- Retry failed: `POST /api/v1/admin/jobs/{id}/retry`
- Cancel pending: `DELETE /api/v1/admin/jobs/{id}`

**Job Types** (from backend)

- `fetch_instrument_data`
- `fetch_bulk_eod_data`
- `backfill_historical`
- `process_corporate_action`
- `data_correction`

### 6. System Administration

**Health Monitoring**

- System health: `GET /api/v1/health`
- Returns status of:
  - API service
  - Database connections (metadata, market_data)
  - Redis connection
  - Job runner status

**Data Quality Overview**

- Quality stats: `GET /api/v1/admin/data/quality-stats`
- Recent issues: `GET /api/v1/admin/data/quality-issues`

### 7. API Integration Patterns

**Request Configuration**

- Base URL from environment variable
- JWT token in Authorization header
- Content-Type: application/json for most requests
- Content-Type: multipart/form-data for file uploads

**Response Handling**

- Success responses use status codes 200-299
- Paginated responses include metadata:
  - `total_count`
  - `page`
  - `limit`
  - `total_pages`
- Error responses follow format:
  - `status_code`
  - `error.type`
  - `error.message`

**Polling Patterns**

- Job status: 5-second intervals
- Data freshness: 30-second intervals
- Health check: 60-second intervals

## User Interface Components

### Navigation

- Sidebar with sections matching backend capabilities:
  - Dashboard (overview stats)
  - Instruments (`/admin/instruments`)
  - Exchanges (`/admin/exchanges`)
  - Data Ingestion (`/admin/data`)
  - Job Queues (`/admin/jobs`)
  - System (`/admin/system`)

### Data Tables

- Server-side pagination and sorting
- Column configuration matches API response fields
- Filter inputs map to API query parameters
- Actions trigger appropriate API endpoints

### Forms

- Field validation matches backend requirements
- Submit buttons disabled during API calls
- Error messages display backend validation errors
- Success messages confirm API operation completion

### Feedback Mechanisms

- Loading states during API calls
- Toast notifications for API responses
- Error boundaries catch failed API calls
- Retry buttons for failed operations

## Development Phases

### Week 1: Foundation and Core CRUD

**Days 1-2: Setup and Authentication**

- Configure Axios client with base URL
- Implement JWT authentication flow
- Setup token refresh interceptor
- Create protected route wrapper

**Days 3-4: Instrument Management**

- Connect table to instruments list endpoint
- Implement CRUD operations
- Add search and filter functionality
- Handle pagination from API

**Days 5-7: Data Ingestion Interface**

- Wire up data freshness endpoint
- Implement backfill job submission
- Create job tracking UI
- Add quick action buttons

### Week 2: Advanced Features

**Days 8-9: Job Queue Management**

- Connect to job listing endpoint
- Implement auto-refresh polling
- Add retry and cancel operations
- Display queue statistics

**Days 10-11: Exchange and Bulk Operations**

- Complete exchange CRUD endpoints
- Add holiday calendar management
- Implement CSV upload for bulk import
- Handle file upload responses

**Days 12-14: Polish and Deployment**

- Comprehensive error handling
- Optimize API call patterns
- Environment-specific API URLs
- Production build configuration

## Success Metrics

### API Integration Complete

- All backend endpoints integrated
- Authentication flow working
- Token refresh automatic
- Error responses handled gracefully

### Functionality Coverage

- All admin endpoints accessible
- CRUD operations functional
- Bulk operations working
- Real-time updates via polling

### Performance Targets

- API response handling optimized
- Pagination prevents large payloads
- Caching reduces redundant calls
- Polling doesn't overload backend

## Backend Dependencies

The admin panel requires these backend endpoints to be functional:

- Authentication endpoints (`/api/v1/auth/*`)
- Admin instrument endpoints (`/api/v1/admin/instruments/*`)
- Exchange management endpoints (`/api/v1/admin/exchanges/*`)
- Data ingestion endpoints (`/api/v1/admin/data/*`)
- Job management endpoints (`/api/v1/admin/jobs/*`)
- System status endpoints (`/api/v1/health`, `/api/v1/status/*`)

The frontend will adapt to the actual response formats provided by these endpoints.

## Development Troubleshooting

### Common Issues

**Backend not responding:**

```bash
# Check if containers are running
docker ps

# If not, start them:
cd ~/Projects/spreadstation-backend/docker
docker-compose up -d

# Check logs if issues persist:
docker-compose logs -f api
```

**CORS errors:**

- Ensure backend allows `http://localhost:5173` in CORS settings
- Check browser console for specific CORS error messages
- Verify API calls include proper headers

**Authentication failures:**

- Check JWT token is included in Authorization header
- Verify token hasn't expired
- Ensure refresh token logic is working

**Port conflicts:**

- Frontend default: 5173 (change with `npm run dev -- --port 3000`)
- Backend must stay on 8000 (hardcoded in Docker setup)
- Database ports: PostgreSQL (5432), Redis (6379)
