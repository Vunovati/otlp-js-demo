'use strict'

const axios = require('axios')
const { trace, ValueType } = require('@opentelemetry/api')

const productsServiceUrl = process.env['PRODUCTS_SERVICE_URL']
const tracer = trace.getTracer('products-client-tracer')
const { meterProvider } = require('./metrics')
const meter = meterProvider.getMeter('cart-service-meter')

const productCacheHitCounter = meter.createCounter('product_cache_hit', {
  description: 'Count of cache hits',
  valueType: ValueType.INT
})

const productCacheMissCounter = meter.createCounter('product_cache_miss', {
  description: 'Count of cache misses',
  valueType: ValueType.INT
})

const productServiceRequestDuration = meter.createHistogram('product_service_request_duration', {
  description: 'Duration of the request to the product service in milliseconds',
  unit: 'ms',
  valueType: ValueType.DOUBLE
})

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
      productCacheHitCounter.add(1) // metrics
      return cache
    } else if (cache === null) {
      span.addEvent('cache empty')
      productCacheMissCounter.add(1) // metrics
    } else if (cacheAge >= CACHE_EXPIRY_MS) {
      span.addEvent(`cache expired ${cacheAge - CACHE_EXPIRY_MS}ms ago`)
      productCacheMissCounter.add(1) // metrics
    }

    span.addEvent('fetching fresh products')

    const reqStart = Date.now()
    const res = await axios(productsServiceUrl)
    const reqDuration = Date.now() - reqStart
    productServiceRequestDuration.record(reqDuration) // metrics
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
