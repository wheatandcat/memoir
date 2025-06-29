# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Memoir is a Japanese weekly reflection app built with React Native and Expo. It allows users to track daily tasks and activities, then reflect on them weekly with the concept "終わったタスク、積み上げよう。1週間を振り返るアプリ" (Accumulate completed tasks. An app to reflect on your week).

## Core Technology Stack
- **React Native + Expo**: Cross-platform mobile development with Expo SDK 52
- **TypeScript**: Strict type safety with advanced configurations
- **GraphQL + Apollo Client**: Type-safe API communication with code generation
- **Firebase Authentication**: User authentication and management
- **Zustand**: Lightweight state management
- **Expo Router**: File-based routing system
- **Biome**: Code formatting and linting
- **pnpm**: Package management

## Development Commands

### Essential Commands
```bash
# Start development server
pnpm start

# Run on specific platforms
pnpm ios
pnpm android

# Type checking and linting
pnpm typecheck
pnpm lint
pnpm format

# Testing
pnpm test
pnpm test:watch

# GraphQL code generation
pnpm codegen

# Generate components using Hygen
pnpm new:component
pnpm new:screen
pnpm new:hook
```

### Build Commands
```bash
# EAS Build
pnpm build:preview
pnpm build:production

# Local builds
pnpm build:local:ios
pnpm build:local:android
```

### Storybook
```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## Architecture Overview

### Directory Structure
- `src/` - Main application code
  - `components/` - Atomic design components (atoms, molecules, organisms)
  - `screens/` - Feature-based screen components with containers
  - `hooks/` - Custom React hooks
  - `stores/` - Zustand state management
  - `graphql/` - GraphQL queries, mutations, and generated types
  - `constants/` - App constants and configurations
  - `utils/` - Utility functions and helpers
  - `types/` - TypeScript type definitions

### Key Architectural Patterns

#### Container/Presentational Pattern
Screens are split into:
- **Container components**: Handle logic, state, and data fetching (e.g., `CreateItemPageContainer`)
- **Presentational components**: Pure UI components (e.g., `CreateItemPage`)

#### Atomic Design System
Components are organized by:
- **atoms/**: Basic UI elements (Button, Input, etc.)
- **molecules/**: Combinations of atoms (FormGroup, etc.)
- **organisms/**: Complex UI sections (Header, ItemList, etc.)

#### GraphQL Integration
- Uses Apollo Client with automatic code generation
- Queries and mutations are co-located with components
- Type-safe operations with generated TypeScript types

### State Management
- **Zustand stores** for global state (user, theme, etc.)
- **Local state** with useState/useReducer for component-specific state
- **Apollo Client cache** for GraphQL data

### Navigation
- **Expo Router** with file-based routing
- Stack navigators for main app flow
- Tab navigation for primary sections

## Testing Strategy

### Unit Testing (Jest)
- Components tested with React Native Testing Library
- Hooks tested with dedicated test utilities
- Utilities and business logic covered

### Storybook
- Component documentation and visual testing
- Isolated component development
- Cross-platform component verification

### E2E Testing
- Detox for end-to-end testing on real devices
- Critical user flows covered

## Development Workflow

### Code Generation
Uses **Hygen** templates for consistent code structure:
- `pnpm new:component <name>` - Creates atomic design components with tests and stories
- `pnpm new:screen <name>` - Creates screen with container/presentational split
- `pnpm new:hook <name>` - Creates custom hooks with tests

### GraphQL Development
1. Update schema or queries in `src/graphql/`
2. Run `pnpm codegen` to generate TypeScript types
3. Use generated types in components

### Platform-Specific Code
- Use `.ios.tsx` and `.android.tsx` extensions for platform-specific implementations
- Platform detection with `Platform.OS` when needed

## Configuration Files

### Key Config Files
- `app.config.ts` - Expo configuration with environment-based settings
- `biome.json` - Code formatting and linting rules
- `tsconfig.json` - TypeScript configuration with path mapping
- `codegen.ts` - GraphQL code generation configuration

### Environment Management
- `.env.local` for local development variables
- EAS secrets for production environment variables
- Different configurations for development/production builds

## Build and Deployment

### EAS Build
- **Development builds**: `pnpm build:preview`
- **Production builds**: `pnpm build:production`
- Configured in `eas.json` with different profiles

### Local Builds
- iOS: `pnpm build:local:ios` (requires Xcode)
- Android: `pnpm build:local:android` (requires Android Studio)

## Common Development Patterns

### Error Handling
- Sentry integration for crash reporting and performance monitoring
- GraphQL error handling with Apollo Client error policies
- User-friendly error states in UI components

### Internationalization
- Support for Japanese and English
- Locale-based date formatting and text display

### Performance Considerations
- React Native new architecture (Fabric) enabled
- Proper image optimization and caching
- Efficient list rendering with FlashList when needed

### Authentication Flow
- Firebase Authentication integration
- Protected routes with authentication guards
- User session management with Zustand

## Testing Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run Detox E2E tests
pnpm e2e:build
pnpm e2e:test
```

This codebase follows modern React Native best practices with a focus on type safety, component reusability, and maintainable architecture.