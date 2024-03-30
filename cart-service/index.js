'use strict'

const cors = require('@fastify/cors')
const { getAllProducts } = require('./get-all-products')
const { asyncFibonacci } = require('./fibonacci')

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

const carts = new Map()

fastify.get('/api/cart', async (request, reply) => {
  const sessionId = request.headers['x-session-id']

  if (!sessionId) {
    return reply.statusCode(400)
  }

  let cart = carts.get(sessionId)

  if (!cart) {
    carts.set(sessionId, new Map())
    cart = carts.get(sessionId)
  }

  const allProducts = await getAllProducts()

  const items = [...cart]
    .map(([cartItemId, quantity]) => {
      return {
        ...allProducts.find(p => p.id === cartItemId),
        quantity
      }
    })
    .filter(item => Boolean(item.id))

  reply.send({
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })
})

fastify.post('/api/cart', async (request, reply) => {
  const newCartItems = request.body.filter(([, quantity]) => quantity > 0)
  const sessionId = request.headers['x-session-id']

  if (!sessionId) {
    return reply.statusCode(400)
  }

  const cart = carts.set(sessionId, newCartItems)

  if (!cart) {
    return reply.statusCode(404)
  }

  const allProducts = await getAllProducts()

  const items = newCartItems
    .map(([cartItemId, quantity]) => {
      return {
        ...allProducts.find(p => p.id === cartItemId),
        quantity
      }
    })
    .filter(item => Boolean(item.id))

  reply.send({
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })
})

fastify.get('/api/fibonacci/:arg', async (request, reply) => {
  const arg = parseInt(request.params.arg)

  reply.send({ result: await asyncFibonacci(arg) })
})

const start = async () => {
  await fastify.register(cors)
  try {
    await fastify.listen({
      port: 3000,
      host: process.env['API_HOST'] ?? '127.0.0.1'
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
