import type {FastifyZodOpenApiSchema, FastifyZodOpenApiTypeProvider,} from 'fastify-zod-openapi';
import * as z from 'zod/v4';
import type {FastifyInstance} from "fastify";

const conversationBodySchema = z.object({
  id: z.string().uuid().optional(),
  conversationId: z.string().uuid().optional(),
  senderId: z.string(),
  action: z.object({
    text: z.object({
      text: z.string(),
      language: z.string().optional(),
    }).optional(),
  }),
  profile: z.object({
    id: z.string(),
    languages: z.array(z.string()),
  }).optional(),
  conversation: z.object({
    id: z.string().uuid(),
  }).optional(),
  language: z.string().optional(),
});

export async function conversationRouter(app: FastifyInstance): Promise<void> {
  // SSE Endpoint - Streaming responses
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: 'POST',
    url: '/conversation/message/stream',
    schema: {
      summary: 'Message stream',
      description: 'Handle conversation messages with Server-Sent Events (SSE) streaming',
      tags: ['conversation'],
      body: conversationBodySchema,
    } satisfies FastifyZodOpenApiSchema,
    handler: async (request, reply) => {
      const body = request.body as {
        action?: { text?: { text: string } };
        profile?: { id: string };
      };

      // Set SSE headers with CORS
      reply.raw.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Credentials': 'true',
      });

      const sendEvent = (data: unknown): void => {
        reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Simulate engine processing start
      sendEvent({
        engineEvent: {
          state: 'processing',
          flowId: 'flow-123',
          nodeId: 'node-456',
        },
      });

      // Simulate AI response with text
      setTimeout(() => {
        sendEvent({
          text: {
            text: `You said: "${body.action?.text?.text ?? 'nothing'}". This is a sample response!`,
            language: 'en',
          },
        });
      }, 500);

      // Simulate tool call
      setTimeout(() => {
        sendEvent({
          toolCall: {
            id: 'tool-call-1',
            name: 'get_weather',
            args: {location: 'San Francisco'},
            result: {temperature: 72, condition: 'sunny'},
          },
        });
      }, 1000);

      // Simulate custom action
      setTimeout(() => {
        sendEvent({
          customAction: {
            name: 'show_notification',
            value: {message: 'Processing complete!'},
          },
        });
      }, 1500);

      // Simulate engine processing complete
      setTimeout(() => {
        sendEvent({
          engineEvent: {
            state: 'completed',
            flowId: 'flow-123',
            nodeId: 'node-456',
            elapsedTime: 2000,
          },
        });
        reply.raw.end();
      }, 2000);

      // Handle connection close
      request.raw.on('close', () => {
        request.log.info('Client disconnected from conversation stream');
      });

      return reply;
    },
  });

  // JSON Endpoint - Batch responses
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: 'POST',
    url: '/conversation/message/batch',
    schema: {
      summary: 'Message Batch',
      description: 'Handle conversation messages with batch JSON response',
      tags: ['conversation'],
      body: conversationBodySchema,
      response: {
        200: {
          content: {
            'application/json': {
              schema: z.array(z.unknown()),
            },
          },
        },
      },
    } satisfies FastifyZodOpenApiSchema,
    handler: async (request, reply) => {
      const body = request.body as {
        action?: { text?: { text: string } };
        profile?: { id: string };
      };

      return reply.send([
        {
          engineEvent: {
            state: 'processing',
            flowId: 'flow-123',
            nodeId: 'node-456',
          },
        },
        {
          text: {
            text: `You said: "${body.action?.text?.text ?? 'nothing'}". This is a sample response!`,
            language: 'en',
          },
        },
        {
          toolCall: {
            id: 'tool-call-1',
            name: 'get_weather',
            args: {location: 'San Francisco'},
            result: {temperature: 72, condition: 'sunny'},
          },
        },
        {
          customAction: {
            name: 'show_notification',
            value: {message: 'Processing complete!'},
          },
        },
        {
          engineEvent: {
            state: 'completed',
            flowId: 'flow-123',
            nodeId: 'node-456',
            elapsedTime: 100,
          },
        },
      ]);
    },
  });
}
