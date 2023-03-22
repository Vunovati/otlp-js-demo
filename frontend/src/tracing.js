import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
// We need this for XMLHttpRequest, axios etc.
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
// For async contexts
import { ZoneContextManager } from "@opentelemetry/context-zone";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

// Optionally register automatic instrumentation libraries
registerInstrumentations({
  instrumentations: [
    new XMLHttpRequestInstrumentation({
      // These are the urls we propagate the trace headers to - E.G our backend, it is best to use a regexp
      // The header sent is traceparent: 00-7755276766ab4b59f7dd8ef0d96b66e5-7334fe7ecb859bc5-01
      propagateTraceHeaderCorsUrls: [
        /http:\/\/localhost:3000\.*/,
        /http:\/\/localhost:3001\.*/,
      ],
    }),
  ],
});

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "WebShop React SPA",
    [SemanticResourceAttributes.SERVICE_VERSION]: "2.0.1",
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
  maxExportBatchSize: 5,
});

provider.addSpanProcessor(consoleProcessor);
provider.addSpanProcessor(otlpBatchProcessor);

provider.register({
  contextManager: new ZoneContextManager(),
});

console.log("Registered web tracer");
