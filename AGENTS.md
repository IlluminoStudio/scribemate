# MODUS OPERANDI
- Your task is to help me build my SaaS MVP, so simplicity and speed is the key.
- Prioritize simplicity and minimalism in your solutions.
- Use simple & easy-to-understand language. Write in short sentences.
- keep our codebase simple: resist creating new files unless it really makes sense.

# MANDATORY TECHNOLOGY CHECK - READ FIRST
**BEFORE implementing ANY UI or functionality, you MUST verify these technology requirements:**

## CRITICAL FRONTEND CONSTRAINTS
- **ICONS**: ALWAYS use Phosphor React icons (`phosphor-react` package) - NEVER use emoji, HTML entities, or other icon libraries
- **TEXT**: ALWAYS use the `Text` component from `frontend/src/components/Text.jsx` - NEVER use native HTML text elements
- **BUTTONS**: ALWAYS use the `Button` component from `frontend/src/components/Button.jsx` - NEVER create custom buttons
- **COLORS**: ALWAYS use CSS variables from `frontend/src/styles/index.css` - NEVER use hardcoded colors
- **FLEXBOX**: ALWAYS use `.flex-row-wrap` for horizontal flex rows that should wrap - NEVER create custom flexbox styles without checking utilities first

## MANDATORY PRE-IMPLEMENTATION CHECKLIST
1. **Check existing components** in `frontend/src/components/` before creating custom UI
2. **Check existing utility classes** in `frontend/src/styles/index.css` before writing CSS
5. **Follow folder structure** conventions
6. **Apply responsive design** principles

# GLOBAL RULES
- BE VERY SUSPICIOUS OF EVERY COMPLICATION in our code. SIMPLE = GOOD, COMPLEX = BAD.
- Always prioritize writing clean, simple, and modular code.
- Do not add unnecessary complications.
- Implement precisely what the user asks for, without additional features or complexity.
- Prioritize simplicity and minimalism in your solutions.
- Code should be as simplest & cleanest as possible. the fewer lines of code changed, the better.
- NEVER delete explanatory comments from the code you're editing (unless they are wrong/obsolete)
- Focus on explaining the non-obvious stuff in the comments, the nuances
- DO NOT delete comments currently in our code. If the comment is obsolete, or wrong, then update it – but NEVER mindlessly remove comments without reason.
- Always use simple and easy-to-understand language.
- Use clear, consistent naming
- Think thoroughly before coding. Write 2-3 reasoning paragraphs.
- Leave ego aside when debugging and fixing errors. You do not know anything.
- Use best practice
- When searching for specific line numbers in code files, ALWAYS use grep_search first as it provides exact line numbers, rather than attempting manual counting or estimation. Never claim to have found accurate line numbers without using the appropriate search tool.
- Always do things in the simplest and most effective way as possible. If this clashes with best practice, then you should prioritize best practice
- Prefix all response messages with ✨ so that I know the rules are being applied.

# ARCHITECTURE OVERVIEW
- **Frontend**: React + Vite (deployed on Vercel)
- **BFF**: Vercel API Routes (Node.js serverless functions) - handles business logic and data processing
- **Database**:
- **Deployment**: Vercel for both frontend and BFF

# TECH STACK
## Core Technologies
- Cursor as my IDE (it's a fork of VSCode)
- Node.js serverless functions (Vercel) for the BFF (Backend for Frontend)
- React for the frontend
- Supabase for the database (PostgreSQL) (not implemented yet)
- Backend and frontend are deployed on Vercel

## UI MANDATORY REQUIREMENTS
- NEVER DEVIATE FROM THESE
- **Phosphor React for icons** (`phosphor-react` package) - MANDATORY
- **Text component** from `frontend/src/components/Text.jsx` - MANDATORY
- **Button component** from `frontend/src/components/Button.jsx` - MANDATORY
- **Color variables** from `frontend/src/styles/index.css` - MANDATORY
- **Shadow variables** from `frontend/src/styles/index.css` - MANDATORY
- NEVER DEVIATE FROM THESE

# CURRENT FOLDER STRUCTURE
- We use the following folder conventions in `frontend/src/`:
  - `public/` — all image assets including icons
  - `components/` — atomic UI components (e.g. Button, Icon, Text)
  - `modules/` — secondary components built by combining atomic components from `components/` (e.g. MessageBox)
  - `pages/` — for top-level route components/pages (e.g. HomePage, AboutPage)
  - `layout/` — for layout components that wrap or arrange pages/components (e.g. MainLayout, AuthLayout, SidebarLayout)
- API routes are in `api/` directory:
  - `lib/` — shared utilities and configurations
  - `api/v1/*.js` — individual API route handlers
- Development scripts and tests are in `dev-scripts/` directory:
  - `dev-scripts/tests/` — API endpoint tests
  - `dev-scripts/server.js` — local development server
  - `dev-scripts/debug-env.js` — environment debugging utilities
- Database migrations are in `supabase/migrations/`

  Example usage:
  - `components/Button.jsx` — a reusable button
  - `pages/HomePage.jsx` — the main landing page
  - `layout/MainLayout.jsx` — a layout that provides the app's main structure (header, sidebar, etc)
  - `api/users.js` — API route for user management
  - `dev-scripts/tests/test-users.js` — tests for users endpoint
  
# FRONTEND RULES
## UI DESIGN PRINCIPLES
- Always use the color variables defined in `frontend/src/styles/index.css` for backgrounds, borders, and text. Never use hardcoded color values in components or styles.
- Our app is light  mode by default. Use `--primary-bg` and `--secondary-bg` for backgrounds.
- Use a minimalist UI with clean, simple layouts and lots of spacing.
- Make sure the design is responsive, working well on both mobile and desktop.
- All interactive elements should have clear hover states and smooth transitions.
- Use tooltips to give extra context where needed.
- Never use blue-tinted gray. Only use the neutral gray variables from the color system.
- All text styling must use the variants defined in `frontend/src/components/Text.jsx`.
- Never use !important in CSS. Use proper CSS specificity and cascade instead.

## Utility CSS Classes
- Use the `.flex-row-wrap` class from `frontend/src/styles/index.css` for any horizontal flex row that should wrap responsively and have consistent spacing. This class ensures children will stack vertically on mobile and wrap as needed on desktop. Prefer this utility over custom flex row styles for consistency and maintainability.
- Only generic layout utility classes (such as `.flex-row-wrap`) should go in `index.css` for global reuse and to avoid duplication.

## COMPONENT USAGE - MANDATORY RULES
- **MANDATORY FIRST STEP**: Before writing ANY custom UI elements, you MUST check `frontend/src/components/` for existing components that can be used.
- **NO CUSTOM BUTTONS**: Never create custom buttons. Always use the `Button` component from `frontend/src/components/Button.jsx`.
- **NO CUSTOM TEXT**: Never use native HTML elements like `<p>`, `<h1>`, `<span>` with manual styling. Always use the `Text` component from `frontend/src/components/Text.jsx`.
- **NO EMOJI ICONS**: Never use emoji characters for icons. Always use Phosphor React icons.
- **SHADOWS**: Always use `var(--shadow-sm|md|lg)` from `frontend/src/styles/index.css`; never hardcode `box-shadow`.
- **COMPONENT OVERRIDE**: Only create custom elements if NO existing component can handle the requirement, and document why.

# BACKEND RULES
## API DEVELOPMENT (BFF)
- API routes handlers are in `api/v1`
- Use `lib/supabase.js` for server-side Supabase client (not implemented yet)
- Use proper error handling and status codes
- Keep API routes focused and simple - one route per resource/action
- Use ES modules syntax (import/export)
- Return consistent JSON responses with proper status codes
- Do not Use try-catch for error handling, let error bubble up
- Error during logging should be allowed to bubble up, ie. do not try-catch
- Validate input data before processing
- Keep API routes focused on single responsibility
- Use environment variables for configuration
- All backend database queries must go through views, never directly on tables. Use the views defined in migrations (not implemented yet)
- All endpoint operations MUST be logged to the user_event_logs table using `lib/eventLogger.js` (see api/auth/login.js for example) (not implemented yet)

## TESTING REQUIREMENTS
TBA