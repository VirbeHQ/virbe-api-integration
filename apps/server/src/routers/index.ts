import type { FastifyInstance } from 'fastify';
import { conversationRouter } from './conversation.js';

export async function registerRouters(app: FastifyInstance): Promise<void> {
  await app.register(conversationRouter);
  // Add more routers here as needed
}
