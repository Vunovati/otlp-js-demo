#Fullstack js tracing with OpenTelemetry

Observing and debugging distributed systems is hard. We are going to talk about tracing here.

So let's say you have a bug and want to know what happened in your system. You reach for your logs and see if there is an exception, a stack trace or anything suspicious, and start your investigation there. That's difficult enough as it is, but even more so in a distributed system. Did the problem happen in service A or service B? Did we get data from the cache, or did we go directly to the downstream service? A call to my server has timed out; was the response lost, or was the work not done at all? To discover that, we need to look at all the potentially involved services logs and figure out what happened.

The widespread way to solve this is to use a correlation id header and then make sure that it is propagated downstream from service A to service B to service Z. We could call this header `correlation-id`, `X-Correlation-ID`, `X-B3-TraceID` ... (which are all either conventions or standards for specific frameworks) 
**TODO: find some more examples of names**

Some alternatives to OTLP tracing:
* Zipkin (Twitter)
* X-Ray (Amazon)
* Dapper (Google, legacy)

The predecessors were OpenCensus and OpenTracing, but they were both merged into OpenTelemetry: https://cloudblogs.microsoft.com/opensource/2019/05/23/announcing-opentelemetry-cncf-merged-opencensus-opentracing/


```
      "headers": {
        "accept": "application/json, text/plain, */*",
...        
        "x-request-id": "1bfe176b-8e28-482a-90b9-0d4dfdadf303",
      }
```



This is usually referred to as context propagation. 

Since it is such a common thing, there was a need to standardise it, so a trace-context standard was created: https://www.w3.org/TR/trace-context/

While we're at it, we sometimes want to attach additional info to our logs like `userId`, `organizationId` etc. One way to do this would be to add even more headers which get propagated to the last service in the request chain. 

Propagating more and more things in our context is not exactly scalable because it results in more traffic and noise. One way to optimise this is to send the context to a centralised database and link it with the correlation-id (trace context). In that case, we only need to propagate one id through our headers. 

This is the approach many distributed tracing systems use (OpenZipkin, Jaeger). Sometimes, though, we need to trace across clouds, or we want to be able to switch the tracing backend provider. There was a need for a vendor-neutral standard, so OpenTelemetry was created. It standardises tracing, metrics and logging. We'll focus on tracing here.

It builds on the trace-context standard (the default but not the only option).

In our requests, we propagate the traceparent header.

```
      "headers": {
        "accept": "application/json, text/plain, */*",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7),
...        
        "traceparent": "00-a8a4234b4c5c9b809bd2fe71074e6345-56df00bfd9d8ebf4-01",
      }
```

And every now and then, we send the rest of the information to the Open Telemetry backend.

**TODO: Add a gif with inter-service comms and sending to OTLP collector**

OTLP Collector will receive data through HTTP and/or GRPC interface and store it in the backend. The backend will expose the data to the UI, joining all the spans by their traceparent and linking them on their parent span.

**Add a JSON from OTLP trace highlighting the span id**

### Traceparent header
As defined by the [W3C standard](https://www.w3.org/TR/trace-context/#traceparent-header)
```
"traceparent": "00-a8a4234b4c5c9b809bd2fe71074e6345-56df00bfd9d8ebf4-01"
```

TODO: colourise the parts of the header

version-format: 00 (The current specification assumes the version is set to 00.)
trace-id: a8a4234b4c5c9b809bd2fe71074e6345 - unique identifier for the entire distributed trace
parent-id: 56df00bfd9d8ebf4 - span-id of the parent, unique to the trace
trace-flags: 01 - trace flags (01 if caller sampled, 00 if it did not)

### Elements
#### Spans
the work that each service is doing is a span - as in the span of time it takes for the work to be done

It is helpful to reason about the list of spans by considering the RPCs that make up our microservices as a sort of a call stack. 

**TODO: add an image of spans for a certain trace as listed in Jeager UI**



TODO: other elements, events etc.

### TODO: common OTLP infrastructure ###

### Setting up local OTLP infrastructure for development
Various vendors offer managed backends to which we can send and inspect our OTLP spans, but it is usually more practical for local dev to have something running locally. Since recently, [Jaeger can receive OTLP traces](https://medium.com/jaegertracing/introducing-native-support-for-opentelemetry-in-jaeger-eb661be8183c). We can set up a [Jaeger](https://www.jaegertracing.io) instance in docker to give us a collector and a UI to inspect our traces.

```
docker run -d --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  jaegertracing/all-in-one:1.42
```

4317 - send spans over GRPC
4318 - send spans over HTTP

Open the dashboard on:
http://localhost:16686/search


### Adding OTLP tracing to our apps
Approaches:
#### Black box instrumentation
The instrumentation is managed by Operations (DevOps, SRE, Platform?) without touching the application code. Done on the level of Orchestrator (K8s), the service mesh (Istio, Lienkerd) or operating system (eBPF?).

#### White box instrumentation - TODO: explain
Developers need to include the OpenTelemetry SDK in the application code and configure it.

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
Example from the docs:
https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/


#### Node.js

##### Auto instrumentation

The example code from the docs: https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/#setup
It runs getNodeAutoInstrumentations() to detect the libraries used and then automatically loads the appropriate instrumentations if available.
All instrumentations are included in the @opentelemetry/auto-instrumentations-node by default.

The list of available instrumentations is here: https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node
Auto instrumentation is a solid and easy option get started quickly. The possible downside is that it is not customisable, which could introduce the noise of unnecessary spans.  

##### Manual instrumentation
We select the instrumentation packages to use. We are also able to configure them which. 
In our example, we select HttpInstrumentation, FastifyInstrumentation and PinoInstrumentation. In addition we can configure 
our HttpInsturmentation to ignore the `/healthckeck` route.

Node-fetch, which is based on undici does not work (yet?). Only the old stuff works.  (TODO: find a name for that). 

We should control the amount of data traced from our env vars.





TODO:
Investigate how to run ./tracing.js with ESM modules. There is an [open issue in OTLP js](https://github.com/open-telemetry/opentelemetry-js/issues/1946) 

##### Idea, Black-box like instrumentation in Node.js
The app can be instrumented with the SDK without dev engagement. 
Not really a novel idea, That's what many APMs do for node.js instrumentation.
The general idea is to patch the Node.js require (Module.prototype.require) function, and then the SDK can initialise itself.
The devs are unaware of that until they see the agent mention in the stacktrace. 

Since we are loading our tracing code with `-r ./tracing.js` and our node command can have as many `-r`s as we like we can

1. add `./tracing.js` and its dependencies
2. alias `node` with `node -r ./tracing.js`
and bake them into our image as part of the multi-stage build

Our node images can then be created from that image.

### Useful env vars used by OTLP SDKs
`OTEL_SERVICE_NAME` - set the service name in the spans

Spec for all SDK env vars:
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/sdk-environment-variables.md

Env vars for Exporter:
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md


### Testing the traced code
We can use inMemoryExporter to test if our code tracing is working as expected.

#### Idea, Telemetry Driven Development
It is common to test how microservices interact with each other in an end-to-end test. We inspect the end results such as the final response, state of the data persisted in a database etc. If our services are instrumented and we have a test collector, we can take it even further. We can inspect the trace and check if all the expected spans exist. This makes it possible to test scenarios such as did service A talk to service B to give me the response, or did it read from its cache? Was a specific header added in the application framework middleware or not? 
#### Idea, Instrumentation bugs
Update the standard bug-handling process to include not only writing new tests to cover the fix but to add instrumentation to make sure we can catch it in the future.


### Resources
[Distributed Tracing in Practice](https://www.oreilly.com/library/view/distributed-tracing-in/9781492056621/)
[Instrumentation Checklist](https://github.com/distributed-tracing-in-practice/instrumentation-checklist/blob/master/checklist.md)
If you have time: [OpenTelemetry Bootcamp by Aspecto](https://www.aspecto.io/opentelemetry-bootcamp)


# Running the examples
1. Install, [Docker Desktop](https://docs.docker.com/desktop/), Tilt.
2. [Enable Kubernetes in Docker](https://docs.docker.com/desktop/kubernetes/#enable-kubernetes)
3. `Tilt up`
4. `npx local-cors-proxy --proxyUrl http://localhost:4318`

