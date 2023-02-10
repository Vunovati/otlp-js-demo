const cors = require('@fastify/cors')
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  console.log(`Headers received: ${JSON.stringify(request.headers, null, 2)}`)
  return { hello: 'opentelemetry' }
})

const start = async () => {
  await fastify.register(cors)
  try {
    await fastify.listen({ port: 3000, host: process.env['API_HOST'] ?? '127.0.0.1' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
