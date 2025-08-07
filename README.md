# SaaS Template

A modern SaaS template with React frontend, Vercel BFF (Backend for Frontend), and Supabase for authentication and database.

## 🏗️ Architecture

- **Frontend**: React + Vite (deployed on Vercel)
- **BFF**: Vercel API Routes (Node.js serverless functions)
- **Database**: Supabase (PostgreSQL + Auth)
- **Deployment**: Vercel

## 🔐 Authentication & Session Management

This lightweight MVP uses a unique client-side session management system:

### Session Creation
- Successful `POST /login` creates a `currentUser` object in localStorage
- Example payload: `{"id":"11111111-1111-1111-1111-111111111111","username":"don","full_name":"Don Smith","role":"coordinator","expiry":1751329232005}`
- The `expiry` timestamp is calculated as `now() + SESSION_EXPIRY_SECONDS` (from `constants.js`)

### Session Extension
- Every meaningful user interaction (button click, mouse click, keypress, page reload) triggers a debounced update
- Session expiry is automatically extended every 30 seconds during active use
- The `expiry` timestamp is updated to `now() + SESSION_EXPIRY_SECONDS`

### API Call Protection
- All API calls are expiry-protected
- Before each API call:
  1. Check localStorage `expiry` against current time
  2. If expired: Block the call and show error "Session expired. Please log out and log in again"
  3. If valid: Proceed with API call, attaching `?user_id=` parameter from localStorage
- The `useUserData` hook provides common access to all localStorage session operations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Git
- Supabase CLI (will be installed via npx automatically)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd saas-template
npm install
```

### 2. Set Up Environment Variables

Create the environment file:
```bash
# Create .env.local file in the root directory
```

Fill in your Supabase credentials in `.env.local`:
```env
# Local Supabase Development Environment
SUPABASE_URL=http://localhost:54321
SUPABASE_SERVICE_ROLE_KEY=<YOUR_SUPABASE_SERVICE_ROLE_KEY>

# Development Server Port
PORT=3001
```

**Note**: This project uses npm workspaces to manage dependencies across frontend and backend. The root `npm install` will automatically install dependencies in all subdirectories.

---

## 🖥️ Local Development Setup (from scratch)

### Prerequisites

- **Docker Desktop** (must be installed and running)
- Node.js 18+
- Git
- Supabase CLI (`npm install -g supabase` or use `npx supabase`)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd saas-template
npm install
```

### 2. Start Docker Desktop

- Make sure Docker Desktop is running before starting Supabase.

### 3. Start Local Supabase

```bash
npx supabase start
```
- Copy the `anon key`, `service_role key`, and `JWT secret` from the output.

### 4. Set Up Environment Variables

Create `.env.local` in the root directory



### 5. Apply Database Migrations

```bash
npx supabase db reset --local
```

---

## 🧪 E2E Testing

This project uses Cypress for end-to-end testing with a local Supabase database.

### Prerequisites for Testing1 **Start Local Supabase** (if not already running):
   ```bash
   npx supabase start
   ```2**Ensure test data is seeded** (automatically handled by tests)

### Running Tests

#### Terminal Mode (Headless)
Run tests in the terminal with full output:
```bash
npm run test:e2e
```
This command will:
- Start both backend and frontend servers
- Run Cypress tests in headless mode
- Display test results in the terminal
- Automatically stop all servers when tests complete

#### Interactive Mode (Cypress Browser)
Open Cypress Test Runner in your browser:
```bash
npm run test:e2e:open
```
This command will:
- Start both backend and frontend servers
- Open Cypress Test Runner in your default browser
- Allow you to select and run tests interactively
- Keep servers running for manual testing

### Test Data
- Tests use a local Supabase instance on port 54322- Test user: `john` with password `password123e is automatically seeded before each test run
