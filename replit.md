# LuxurybyUS - Premium Watch Marketplace

## Overview

LuxurybyUS is a full-stack luxury watch marketplace application built with modern web technologies. The platform allows users to browse, inquire about, and sell premium timepieces from prestigious brands like Rolex, Patek Philippe, and Audemars Piguet. The application focuses on the Nigerian market with pricing in Naira and emphasizes authenticity and professional service.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom luxury design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Context API for global state, TanStack Query for server state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture
- **Development**: Hot module replacement with Vite integration

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Connection**: Neon Database serverless connection
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage for development/testing

## Key Components

### Database Schema
- **Users**: Authentication and user management
- **Watches**: Core product catalog with detailed specifications
- **Inquiries**: Customer interest tracking linked to specific watches
- **Sell Submissions**: Customer watch selling requests
- **Newsletters**: Email subscription management

### API Endpoints
- `GET /api/watches` - Retrieve all watches
- `GET /api/watches/:id` - Get specific watch details
- `GET /api/watches/featured` - Get featured watches
- `POST /api/inquiries` - Submit customer inquiries
- `POST /api/sell-submissions` - Submit watches for selling
- `POST /api/newsletter` - Newsletter subscriptions

### Frontend Features
- Responsive design with mobile-first approach
- Product catalog with filtering and search
- Detailed product pages with specifications
- Customer inquiry forms
- Watch selling submission forms
- Newsletter subscription
- Toast notifications for user feedback

### UI/UX Design System
- **Typography**: Inter for body text, Playfair Display for headings
- **Color Scheme**: Luxury black, dark gray, and gold accent colors
- **Components**: Comprehensive UI component library using Radix primitives
- **Responsive**: Mobile-first design with breakpoint-based layouts

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express.js routes handle requests and validation
3. **Data Layer**: Drizzle ORM manages database interactions
4. **Response**: JSON responses sent back to client
5. **State Management**: Client updates UI state based on API responses

## External Dependencies

### Database & Infrastructure
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **drizzle-kit**: Database migration and schema management

### UI & Styling
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### State & Forms
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **@hookform/resolvers**: Form validation resolvers
- **zod**: TypeScript-first schema validation

### Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit hosting
- **Database**: PostgreSQL 16 module
- **Port Configuration**: Development on port 5000, external on port 80
- **Hot Reload**: Vite HMR with file watching

### Production Build Process
1. **Frontend Build**: Vite bundles React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Assets**: Frontend assets served from `dist/public`
4. **Process Management**: Node.js serves both API and static files

### Environment Configuration
- **Development**: `npm run dev` - Concurrent frontend and backend development
- **Production**: `npm run build && npm run start` - Optimized production build
- **Database**: Environment variable `DATABASE_URL` for connection string

## Changelog

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.