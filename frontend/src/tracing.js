import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

// Optionally register automatic instrumentation libraries
registerInstrumentations({
  instrumentations: [],
});

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "otel-js-frontend",
    [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
  })
);

const provider = new WebTracerProvider({
  resource: resource,
});

const consoleExporter = new ConsoleSpanExporter();
const otlpExporter = new OTLPTraceExporter({
  // TODO: read from OTEL_EXPORTER_OTLP_ENDPOINT - https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-http
  //url: 'http://localhost:4318/v1/traces', // url is optional and can be omitted - default is
  url: "http://localhost:8010/proxy/v1/traces", // url is optional and can be omitted - default is
  headers: {
    foo: "bar",
  }, // an optional object containing custom headers to be sent with each request will only work with http
  concurrencyLimit: 10, // an optional limit on pending requests
});

const consoleProcessor = new SimpleSpanProcessor(consoleExporter);
const otlpBatchProcessor = new BatchSpanProcessor(otlpExporter, {
  maxExportBatchSize: 2,
});

provider.addSpanProcessor(consoleProcessor);
provider.addSpanProcessor(otlpBatchProcessor);

provider.register();

console.log("Registered web tracer");
