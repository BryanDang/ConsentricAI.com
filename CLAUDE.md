# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ConsentricAI.com is a React-based marketing website built with Vite, TypeScript, and shadcn/ui components. The site showcases ConsentricAI's trust-first conversation recording technology with ultrasonic consent signals. It's a single-page application with a modern component-based architecture optimized for the Lovable development platform.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server on localhost:8080
npm run build        # Production build
npm run build:dev    # Development build 
npm run lint         # Run ESLint for code quality
npm run preview      # Preview production build locally
```

### Package Management
```bash
npm i               # Install dependencies (uses both npm and bun.lockb)
```

Note: This project uses npm for package management but has bun.lockb present, indicating mixed package manager usage in the Lovable platform.

## Architecture & Structure

### Core Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin for fast compilation
- **Routing**: React Router DOM (single page with 404 handling)
- **State Management**: TanStack Query for server state, no global client state management
- **Styling**: Tailwind CSS with shadcn/ui component system
- **Development**: Lovable platform integration with component tagging

### Directory Structure
```
src/
├── components/           # Main landing page sections
│   ├── Hero.tsx         # Hero section with sonar animation
│   ├── ProblemSolution.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── UseCases.tsx
│   ├── Trust.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── SonarWaves.tsx   # Custom sonar animation component
│   └── ui/              # shadcn/ui component library (35+ components)
├── pages/               # Route components
│   ├── Index.tsx        # Main landing page
│   └── NotFound.tsx     # 404 handler
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (cn helper for className merging)
└── assets/              # Static assets (hero background image)
```

### Key Architectural Patterns
- **Component Composition**: Landing page built from sequential section components
- **Path Aliases**: `@/` resolves to `src/` for clean imports
- **CSS Variables**: HSL-based color system with semantic naming
- **Custom Animations**: Tailwind keyframes for sonar pulse, fade-in-up, float effects
- **Responsive Design**: Mobile-first approach with container-based layouts

## Technology Stack

### Core Dependencies
- **React 18.3.1** - Component framework
- **TypeScript 5.8.3** - Type safety (with relaxed strictness settings)
- **Vite 5.4.19** - Build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing
- **TanStack Query 5.83.0** - Server state management

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Complete component library based on Radix UI primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **tailwind-merge + clsx** - Conditional className utilities

### Development Tools
- **ESLint 9.32.0** - Code linting with TypeScript and React rules
- **Lovable Tagger** - Platform-specific component tagging for development

## Styling System

### Color Scheme
- Uses CSS custom properties with HSL values
- Primary brand colors with light variants
- Semantic color naming (background, foreground, muted, etc.)
- Custom gradient definitions for hero and accent areas

### Typography
- Inter font family as primary sans-serif
- Large heading scales (5xl-7xl for hero sections)
- Responsive text sizing with mobile-first breakpoints

### Custom Animations
- **sonar-pulse**: 3s infinite animation for consent visualization
- **fade-in-up**: 0.6s ease-out for content reveals  
- **float**: 6s infinite subtle floating motion

## Component Patterns

### Landing Page Structure
The main page (Index.tsx) follows a sequential section pattern:
Hero → ProblemSolution → HowItWorks → Features → UseCases → Trust → CTA → Footer

### shadcn/ui Integration
- Full component library pre-configured with Radix UI primitives
- Variant-based styling with class-variance-authority
- Form handling with react-hook-form and Zod validation
- Toast notifications with dual providers (Radix + Sonner)

### Routing Strategy
- Single page application with catch-all 404 handling
- Comment indicates custom routes should be added above the wildcard route
- Browser router configuration with tooltip and query providers

## Development Notes

### TypeScript Configuration
- Relaxed strictness settings for rapid development
- Path mapping configured for `@/*` aliases
- Composite project setup with separate app and node configurations

### ESLint Setup
- Modern flat config format
- React Hooks and React Refresh plugins
- Unused variables warnings disabled for development flexibility

### Lovable Platform Integration
- Component tagger enabled in development mode
- Pre-configured for Lovable's deployment and preview system
- README contains Lovable-specific workflow instructions

### Browser Compatibility
- Targets modern browsers with ES2020 features
- Uses React 18 concurrent features
- Vite's SWC plugin for fast TypeScript compilation