## Build
FROM docker.io/oven/bun:1.2.21-slim AS build
LABEL authors="madhanraj"
# workspace
WORKDIR /app
# Github token for private packages
ARG NPM_TOKEN
# Configure npm to fetch private packages
RUN touch .npmrc && echo "@microservice:registry=https://npm.pkg.github.com/" >> .npmrc \
 && echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
# copy package files
COPY . /app
# user group andd permission
RUN groupadd -r appgroup \
 && useradd -r -g appgroup -d /app -s /sbin/nologin appuser \
 && chown -R appuser:appgroup /app
# switch non root user
USER appuser
# Install dependencies and build
RUN bun install && bun run build

## Production
FROM docker.io/oven/bun:1.2.21-slim AS prod
# workspace
WORKDIR /app
# copy package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
# user group and permission
RUN groupadd -r appgroup \
 && useradd -r -g appgroup -d /app -s /sbin/nologin appuser
# switch non root user
USER appuser
# Environment variables
ENV PORT=3000
ENV NODE_ENV=production
# run server
CMD ["bun","start"]
# expose port
EXPOSE 3000
