'use strict'

const axios = require('axios')
const opentelemetry = require('@opentelemetry/api')

const productsServiceUrl = process.env['PRODUCTS_SERVICE_URL']
const tracer = opentelemetry.trace.getTracer('products-client-tracer')

let cache = null
let cacheTimestamp = null

const CACHE_EXPIRY_MS = 30 * 1000

async function getAllProducts() {
  return tracer.startActiveSpan('getAllProducts', async span => {
    span.setAttribute('productsServiceUrl', productsServiceUrl)

    const now = Date.now()

    const cacheAge = now - cacheTimestamp

    if (Array.isArray(cache) && cacheAge < CACHE_EXPIRY_MS) {
      span.addEvent(`returning ${cache.length} products from cache`)
      span.end()
      return cache
    } else if (cache === null) {
      span.addEvent('cache empty')
    } else if (cacheAge >= CACHE_EXPIRY_MS) {
      span.addEvent(`cache expired ${cacheAge - CACHE_EXPIRY_MS}ms ago`)
    }

    span.addEvent('fetching fresh products')

    const res = await axios(productsServiceUrl)
    const products = res.data

    cache = products
    cacheTimestamp = now

    span.end()
    return products
  })
}

module.exports = {
  getAllProducts
}
