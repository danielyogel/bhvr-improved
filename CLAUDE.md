# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Type Checking Rule

**ALWAYS run `bun run type-check` before making any code edits.** This ensures the monorepo is in a valid TypeScript state before modifications. If type checking fails, fix those errors first before proceeding with any code changes.

## Project Overview

This is a full-stack TypeScript monorepo built with Bun, Hono, Vite, and React. The project emphasizes type safety with shared types between client and server using oRPC for end-to-end type-safe RPC communication.

## Architecture

### Monorepo Structure
- **Root**: Contains workspace configuration, Turbo orchestration, and development tooling
- **`client/`**: React frontend with Vite bundling
- **`server/`**: Hono backend with oRPC API endpoints
- **`packages/shared/`**: Shared TypeScript types and utilities exported to both client and server

### Type Safety System
The project uses oRPC for type-safe client-server communication:
- Server defines API routes in `server/src/router/index.ts` using Zod schemas
- Client imports the router type from server and creates a typesafe client in `client/src/lib/orpcClient.ts`
- Shared utilities and types are in `packages/shared/src/`

### Key Components
- **oRPC Router**: Located in `server/src/router/index.ts`, defines API endpoints with Zod validation
- **oRPC Client**: Located in `client/src/lib/orpcClient.ts`, provides type-safe client for API calls
- **Shared Package**: `packages/shared/` contains utilities like `assertNever` for exhaustive checking

## Development Commands

### Root-level commands (run from project root):
- `bun run dev` - Start all workspaces in development mode
- `bun run dev:client` - Start only the React frontend
- `bun run dev:server` - Start only the Hono backend
- `bun run build` - Build all workspaces
- `bun run build:client` - Build only the client
- `bun run build:server` - Build only the server
- `bun run lint` - Lint all workspaces
- `bun run type-check` - Type check all workspaces
- `bun run test` - Run tests across all workspaces
- `bun run biome` - Run Biome formatter/linter with auto-fix

### Workspace-specific commands:
- Client: `bun run dev`, `bun run build`, `bun run lint`, `bun run type-check`
- Server: `bun run dev`, `bun run build`, `bun run type-check`
- Shared: `bun run build`, `bun run dev`, `bun run type-check`

## Tooling Configuration

### Build System
- **Turbo**: Orchestrates builds and provides caching across workspaces
- **Bun**: Runtime, package manager, and build tool
- **TypeScript**: Shared via workspace catalog for version consistency

### Code Quality
- **Biome**: Handles formatting and linting (configured in `biome.json`)
  - 120 character line width
  - Single quotes, trailing commas disabled, semicolons enabled
- **Lefthook**: Git hooks that run Biome checks on commit and push
- **ESLint**: Used in client workspace for React-specific linting

### Development Workflow
1. Install dependencies: `bun install`
2. Start development: `bun run dev`
3. The shared package builds automatically during postinstall
4. Client runs on Vite dev server, server runs with Bun watch mode
5. Both include concurrent TypeScript compilation with watch mode

## Adding New Features

### Server API Endpoints
1. Define new endpoints in `server/src/router/index.ts`
2. Use Zod schemas for input validation
3. Export in the `orpcRouter` object
4. Types are automatically available on the client

### Client API Usage
1. Import `client` from `./lib/orpcClient`
2. Use the client with full type safety: `client.routeName.methodName()`
3. Handle errors using `isDefinedError` for defined API errors

### Shared Types/Utilities
1. Add to `packages/shared/src/types.ts` or create new files
2. Export from `packages/shared/src/index.ts`
3. Import as `@repo/shared` in client/server