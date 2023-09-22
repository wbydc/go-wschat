FROM golang:1.21.0-bullseye as builder
WORKDIR /app

COPY go.* ./
RUN go mod download

COPY . ./

RUN go -C cmd/wschat build -v -o main

FROM debian:bullseye-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  ca-certificates && \
  rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/cmd/ /app/cmd
COPY --from=builder /app/resources/ /app/resources

CMD ["/app/cmd/wschat/main"]
