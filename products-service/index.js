const cors = require('@fastify/cors')
const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty'
    },
    serializers: {
      res(reply) {
        // The default
        return {
          statusCode: reply.statusCode
        }
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          // Including the headers in the log could be in violation
          // of privacy laws, e.g. GDPR. You should use the "redact" option to
          // remove sensitive fields. It could also leak authentication data in
          // the logs.
          headers: request.headers
        }
      }
    }
  }
})

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})


// TODO: get allProducts from another service
fastify.get('/api/products', async (_request, reply) => {
  const res = await pool.query('SELECT * FROM products')
  reply.send(res.rows)
})

const start = async () => {
  await fastify.register(cors)
  try {
    await fastify.listen({
      port: 3001,
      host: process.env['API_HOST'] ?? '127.0.0.1'
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Shutting down gracefully...')
  await fastify.close()
  await pool.end()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Shutting down gracefully...')
  await fastify.close()
  await pool.end()
  process.exit(0)
})
