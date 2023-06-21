# Golang Backend

The golang backend application consumes the kafka messages, process and put the response into kafka

## Requirements

| Name | Version | Notes | Mandatory
|------|---------|---------|---------|
| [golang](https://golang.org/dl/) | >= go1.20.4 | Main programming language | true
| [docker](https://www.docker.com/) | n/a | Used to start kafka | true
| [make](https://www.gnu.org/software/make/) | depending on OS. Shortcut commands | n/a | true

## Providers

| Name | Version | Notes
|------|---------|---------|
| [kafka](https://kafka.apache.org/) | n/a | Deal with topic events

### Dependencies
In go root directory:

```bash
go mod tidy
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

### Teste Kafka 
Create two topics there `localhost:9021`
- input
- output

In the input topic you can simulate trades, publishing messages to the input topic:
```bash
{
    "investor_id": "Poppins",
    "asset_id": "asset1",
    "current_shares": 0,
    "shares": 5,
    "price": 5.0,
    "order_type": "BUY"
}
```
```bash
{
    "order_id": "1",
    "investor_id": "Jane",
    "asset_id": "asset1",
    "current_shares": 10,
    "shares": 5,
    "price": 5.0,
    "order_type": "SELL"
}
```