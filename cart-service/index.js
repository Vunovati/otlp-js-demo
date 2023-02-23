'use strict'

const cors = require('@fastify/cors')
const { getAllProducts } = require('./get-all-products')

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
carts.set(
  'demo-cart',
  new Map([
    [1, 1],
    [2, 1]
  ])
)

fastify.get('/api/cart/:cartId', async (request, reply) => {
  const cart = carts.get(request.params.cartId)

  if (!cart) {
    return reply.statusCode(404)
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

fastify.post('/api/cart/:cartId', async (request, reply) => {
  const newCartItems = request.body.filter(([, quantity]) => quantity > 0)
  console.log(`Updated cart ${JSON.stringify(newCartItems, null, 2)}`)
  const cart = carts.set(request.params.cartId, newCartItems)

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
