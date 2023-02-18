'use strict'

const axios = require('axios')

const productsServiceUrl = process.env['PRODUCTS_SERVICE_URL']

async function getAllProducts() {
  const res = await axios(productsServiceUrl)

  const products = res.data

  console.log(`Products ${JSON.stringify(products, null, 2)}`)

  return products
}

module.exports = {
  getAllProducts
}
