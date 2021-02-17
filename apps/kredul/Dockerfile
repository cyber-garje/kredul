FROM node:12-alpine as builder

# Build application
WORKDIR /build
COPY . .
RUN yarn install --production --ignore-scripts
RUN yarn run kredul:build:prod

# Move essantial to app directory
WORKDIR /app
RUN mv /build/dist /build/apps /build/node_modules /build/package.json /build/server ./

# Clean build folder
RUN rm -rf /build

ENV PORT=4200
ENV HOSTNAME=0.0.0.0
ENV APP_PATH=/dist/apps/kredul/

# Run app server
EXPOSE 4200
CMD ["yarn", "run", "kredul:start:prod"]
