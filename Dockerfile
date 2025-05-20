# Stage 1: Build on Debian Bookworm
FROM debian:bookworm AS builder

RUN apt-get update && apt-get install -y curl build-essential pkg-config libssl-dev

# Install Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app
COPY . .
RUN cargo build --release

# Stage 2: Run on Debian Bookworm Slim
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv ca-certificates \
    && python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --upgrade pip yt-dlp \
    && apt-get clean

ENV PATH="/opt/venv/bin:$PATH"


COPY --from=builder /app/target/release/fast_backend /usr/local/bin/app

EXPOSE 8080

CMD ["/usr/local/bin/app"]
