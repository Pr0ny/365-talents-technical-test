# Building the app
FROM node:18-alpine3.17 as builder

WORKDIR /app
COPY ./src .
RUN npm install
RUN npm run build

# Running the app
FROM node:18-alpine3.17

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "npm", "run", "start-prod"]
