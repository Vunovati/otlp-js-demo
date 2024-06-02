const {
  MeterProvider,
  PeriodicExportingMetricReader
} = require('@opentelemetry/sdk-metrics')
const { Resource } = require('@opentelemetry/resources')
const {
  OTLPMetricExporter
} = require('@opentelemetry/exporter-metrics-otlp-proto') // TODO: does this need to be explicitly installed or can we automate this selection with env vars?

const periodicReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter()
})

const meterProvider = new MeterProvider({
  resource: new Resource({
    'service.name': process.env.OTEL_SERVICE_NAME // TODO: is this a bug in Resource?
  }),
  readers: [periodicReader]
})

// meterProvider.addMetricReader(periodicReader)

module.exports = {
  meterProvider
}
