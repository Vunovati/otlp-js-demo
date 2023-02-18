const cors = require('@fastify/cors')
const fastify = require('fastify')({
  logger: true
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
fastify.get('/api/products', async (_request, reply) => {
  reply.send(allProducts)
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
