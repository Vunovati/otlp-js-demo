const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const oldProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    imageSrc: 'src/WebShopImages/BasicTee/BasicTee01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'White',
    gender: 'Male',
    newArrival: false,
    trendingNow: true
  }
]

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    // TODO: add some sample images to the gh repo
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    color: 'Black',
    gender: 'Male',
    newArrival: false,
    trendingNow: true
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
    color: 'Black',
    gender: 'Male',
    newArrival: false,
    trendingNow: true
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
    color: 'Black',
    gender: 'Male',
    newArrival: false,
    trendingNow: true
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
    color: 'Black',
    gender: 'Male',
    newArrival: false,
    trendingNow: true
  }
  // More products...
]

async function main() {
  // Delete all records
  await pool.query('DELETE FROM products')

  for (const product of products) {
    const query = `
      INSERT INTO products ("id", "name", "imageSrc", "imageAlt", "price", "color", "gender", "newArrival", "trendingNow")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `
    const values = [
      product.id,
      product.name,
      product.imageSrc,
      product.imageAlt,
      product.price,
      product.color,
      product.gender,
      product.newArrival,
      product.trendingNow
    ]
    try {
      await pool.query(query, values)
      console.log(`Inserted product with id: ${product.id}`)
    } catch (err) {
      console.error(`Error inserting product with id: ${product.id}`, err)
    }
  }
  return pool.end()
}

main()
