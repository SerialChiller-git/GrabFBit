# Stage 1 - Build the Rust binary
FROM rust:1.78 as builder

WORKDIR /app
COPY . .

# Build dependencies first (for caching)
RUN cargo fetch
RUN cargo build --release

# Stage 2 - Final image
FROM debian:bookworm-slim

# Install yt-dlp and other dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ca-certificates \
    && pip3 install yt-dlp \
    && apt-get clean


# Copy the binary from builder stage
COPY --from=builder /app/target/release/fast_backend /usr/local/bin/app

# Expose the port your app runs on (change if needed)
EXPOSE 8080

# Start your app
CMD ["/usr/local/bin/app"]
