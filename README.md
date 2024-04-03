# Full Stack JS Observability demo app

Web Shop application demonstrating observability in a distributed system.
The application consists of:

* WebShop React SPA - Vite + React app
* Products Service - Node.js app with PostgreSQL datastore
* Cart Service - Node.js app with in-memory state

<img width="590" alt="image" src="https://github.com/Vunovati/otlp-js-demo/assets/441333/7dcc7558-0a9a-4111-8713-1a7be1f1aa01">


## Running the project
1. Install [Docker Desktop](https://docs.docker.com/desktop/) and [Tilt](https://docs.tilt.dev/install.html).
2. [Enable Kubernetes in Docker](https://docs.docker.com/desktop/kubernetes/#install-and-turn-on-kubernetes)
3. run `tilt up` from the root of the project
4. `cd products-service`
5. `npm install && npm run setup-db`

Open the Jaeger dashboard on:
[http://localhost:16686/search]()

#### Browser

Vite React JS application loading the tracing.js file from App.jsx

Things to note:
1. Registers XMLHttpRequestInstrumentation and sets propagateTraceHeaderCorsUrls to our backend.
This means when making requests towards http://localhost:8090 the OTLP SDK will inject the traceparent header.
2. Sets the SemanticResourceAttributes: SERVICE_VERSION and SERVICE_NAME
3. Adds consoleExporter - all spans get immediately written to browser log
4. Adds OTLPTraceExporter with URL pointing to the OTLP collector
5. Uses SimpleSpanProcessor with consoleExporter - Send every span to console immediately
6. Uses BatchSpanProcessr with otlpExporter - Send span to OTLP collector in batches of two.

Further reading:
[Example from the docs](https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/)
