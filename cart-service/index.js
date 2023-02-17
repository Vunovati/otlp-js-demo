const cors = require('@fastify/cors')
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  console.log(`Headers received: ${JSON.stringify(request.headers, null, 2)}`)
  return { hello: 'opentelemetry' }
})

const allProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    // TODO: add some sample images to the gh repo
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'Black'
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    // TODO: add some sample images to the gh repo
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'Black'
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    // TODO: add some sample images to the gh repo
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'Black'
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    // TODO: add some sample images to the gh repo
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'Black'
  }
  // More products...
]

// TODO: get allProducts from another service
fastify.get('/api/products', async (request, reply) => {
  reply.send(allProducts)
})

const carts = new Map()
carts.set(
  'demo-cart',
  new Map([
    [1, 1],
    [2, 1]
  ])
)

fastify.get('/api/cart/:cartId', (request, reply) => {
  const cart = carts.get(request.params.cartId)

  if (!cart) {
    return reply.statusCode(404)
  }

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

fastify.post('/api/cart/:cartId', (request, reply) => {
  const newCartItems = request.body.filter(([, quantity]) => quantity > 0)
  console.log(`Updated cart ${JSON.stringify(newCartItems, null, 2)}`)
  const cart = carts.set(request.params.cartId, newCartItems)

  if (!cart) {
    return reply.statusCode(404)
  }

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
