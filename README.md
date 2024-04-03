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
3. run `tilt up` from the root of the project to start all the services
4. setup data in DB with: `cd products-service && npm install && npm run setup-db`
5. setup logging infra: `cd ../logging-infra && docker compose up`


### Links
* Frontend app: [http://localhost:5173/]()
* Tilt dashboard (k8s): [http://localhost:10350]()
* Jaeger dashboard (traces): [http://localhost:16686/search]()
* Loki dashboard: [http://localhost:3200/explore]()
