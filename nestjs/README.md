# Nestjs Backend

REST Api, to publish a transaction into Kafka that will be consumed by Golang backend.

## Requirements

| Name | Version | Notes |
|------|---------|---------|
| [node](https://nodejs.org/en/download) | >= 18.16.0 | To install package by npx
| [prisma](https://www.prisma.io/) | `npm i @prisma/client` | Main node ORM
| [nestjs](https://nestjs.com/) | `npm i -g @nestjs/cli` | Node.js framework to build scalable server
| [docker](https://www.docker.com/) | n/a | Used to start kafka and mongodb
| [make](https://www.gnu.org/software/make/) | depending on OS. Shortcut commands | n/a

## Providers

| Name | Version | Notes
|------|---------|---------|
| [kafka](https://kafka.apache.org/) | `npm install @nestjs/microservices@10.0.0 kafkajs` | Deal with topic events
| [mongodb](https://www.mongodb.com/) | any stable version | Used to store transactions


### Dependencies
In go root directory:

```bash
npx prisma generate
```

Verify that you have this line `127.0.0.1 host.docker.internal`. Otherwise add to allow run the container
```bash
cat /etc/hosts
```

## Usage
Follow the steps below in the go root directory

### Setup kafka container
```bash
make env
```

### Run backend
```bash
make run
```