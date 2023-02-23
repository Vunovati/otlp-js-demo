'use strict'

const process = require('process')
const opentelemetry = require('@opentelemetry/sdk-node')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino')
const {
  FastifyInstrumentation
} = require('@opentelemetry/instrumentation-fastify')
const { Resource } = require('@opentelemetry/resources')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')
const {
  SemanticResourceAttributes
} = require('@opentelemetry/semantic-conventions')

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
// const traceExporter = new ConsoleSpanExporter();
const traceExporter = new OTLPTraceExporter()

const instrumentations = [
  new HttpInstrumentation({ ignoreIncomingPaths: ['/healthcheck'] }),
  new FastifyInstrumentation(),
  new PinoInstrumentation()
]

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'Cart Service'
  }),
  traceExporter,
  instrumentations
})

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk
  .start()
  .then(() => console.log('Tracing initialized'))
  .catch(error => console.log('Error initializing tracing', error))

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch(error => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0))
})
