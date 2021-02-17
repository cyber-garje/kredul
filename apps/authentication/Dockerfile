FROM node:12-alpine as builder

WORKDIR /app

COPY . .
RUN yarn install --production --ignore-scripts

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

RUN yarn run authentication:build:prod

EXPOSE 3001

CMD ["yarn", "run", "authentication:start"]
