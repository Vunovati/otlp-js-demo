k8s_yaml('jaeger-deployment.yaml')
k8s_resource('jaeger', port_forwards=[16686, 4318])


# CART
dockerfile_cart="""
FROM node:20-bullseye
WORKDIR /app
COPY cart-service/package*.json .
RUN npm install
COPY cart-service .
ENV API_HOST 0.0.0.0
"""

docker_build('cart-service-image', '.',
    build_args={'node_env': 'development'},
    entrypoint='node --watch -r "./tracing/auto-instrumentation.js" index.js',
    dockerfile_contents=dockerfile_cart,
    live_update=[
        sync('./cart-service', '/app'),
        run('cd /app && npm install', trigger=['./package.json', './package-lock.json']),
    ]
)

k8s_yaml('./cart-service/k8s-deployment.yaml')
k8s_resource('cart-service', port_forwards=3000)

# PRODUCTS
dockerfile_products="""
FROM node:20-bullseye
WORKDIR /app
COPY products-service/package*.json .
RUN npm install
COPY products-service .
ENV API_HOST 0.0.0.0
"""

docker_build('products-service-image', '.',
    build_args={'node_env': 'development'},
    entrypoint='node --watch -r "./tracing/auto-instrumentation.js" index.js',
    dockerfile_contents=dockerfile_products,
    live_update=[
        sync('./products-service', '/app'),
        run('cd /app && npm install', trigger=['./package.json', './package-lock.json']),
    ]
)

dockerfile_postgres="""
FROM postgres:16
ENV POSTGRES_DB products
ENV POSTGRES_USER user
ENV POSTGRES_PASSWORD password
"""
docker_build('postgres-image', '.',
    dockerfile_contents=dockerfile_postgres,
)

k8s_yaml('./products-service/k8s-deployment.yaml')
k8s_resource('products-service', port_forwards=3001)
k8s_resource('postgres', port_forwards=5432)

# FRONTEND
dockerfile_frontend="""
FROM node:20-bullseye
WORKDIR /app
COPY frontend/package*.json .
RUN npm install
COPY frontend .
"""

docker_build('frontend-image', '.',
    build_args={'node_env': 'development'},
    entrypoint='npm run dev',
    dockerfile_contents=dockerfile_frontend,
    live_update=[
        sync('./frontend', '/app'),
        run('cd /app && npm install', trigger=['./package.json', './package-lock.json']),
    ]
)

k8s_yaml('./frontend/k8s-deployment.yaml')
k8s_resource('frontend', port_forwards=5173)
