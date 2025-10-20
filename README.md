# virbe-api-integrations

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Fastify, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Fastify** - Fast, low-overhead web framework
- **Node.js** - Runtime environment
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```


Then, run the development server:

```bash
turbo dev # or pnpm dev, bun dev
```

The API is running at [http://localhost:3000](http://localhost:3000).
The Documentation is running at [http://localhost:4000](http://localhost:4000).



## Project Structure

```
virbe-api-integrations/
├── apps/
│   └── fumadocs/      # Documentation (using Fumadocs - Next.js)
│   └── server/        # Backend API (Fastify)
├── pacakges/
│   └── virbe-dtos/    # Virbe API Types for validation (using ZOD) 
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:docs`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
