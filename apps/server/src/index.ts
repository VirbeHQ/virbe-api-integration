import fastifySwagger from '@fastify/swagger';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransformers,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-zod-openapi';
import yaml from 'js-yaml';
import {registerRouters} from '@/routers';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifyCors, {
  origin: ['http://localhost:4000'],
  credentials: true,
});

await app.register(fastifyZodOpenApiPlugin);
await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'hello world',
      version: '1.0.0',
    },
    openapi: '3.1.0',
  },
  ...fastifyZodOpenApiTransformers,
});

// Register all routers
await registerRouters(app);

// Serve OpenAPI specification in JSON format
app.get('/openapi.json', async () => {
  return app.swagger();
});

// Serve OpenAPI specification in YAML format
app.get('/openapi.yaml', async (_request, reply) => {
  const spec = app.swagger();
  const yamlSpec = yaml.dump(spec);

  reply.header('Content-Type', 'application/x-yaml');
  return yamlSpec;
});

await app.ready();
await app.listen({port: 3000});
