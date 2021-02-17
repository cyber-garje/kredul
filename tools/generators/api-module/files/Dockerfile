FROM node:12-alpine as builder

WORKDIR /app

COPY . .
RUN yarn install --production --ignore-scripts

ENV PORT=<%= innerPort %>
ENV HOSTNAME=<%= innerHost %>

RUN yarn run <%= dasherize(libName) %>:build:prod

EXPOSE <%= innerPort %>

CMD ["yarn", "run", "<%= dasherize(libName) %>:start"]
