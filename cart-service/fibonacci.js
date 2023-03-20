const opentelemetry = require('@opentelemetry/api')

const tracer = opentelemetry.trace.getTracer('fibonacci-tracer')

const fibonacci = n =>
  tracer.startActiveSpan(`fibonacci(${n})`, span => {
    if (n === 0) {
      span.end()
      return 0
    }
    if (n === 1) {
      span.end()
      return 1
    }

    const sum = fibonacci(n - 1) + fibonacci(n - 2)

    span.end()

    return sum
  })

const asyncFibonacci = async arg =>
  new Promise(resolve => {
    tracer.startActiveSpan('fibonacci', parentSpan => {
      const result = fibonacci(arg)

      parentSpan.end()
      resolve(result)
    })
  })

module.exports = {
  asyncFibonacci
}
