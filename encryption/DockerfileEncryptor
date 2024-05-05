# Use an official Golang runtime as a base image
FROM golang:1.21 as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o encryptor . 

# Start a new stage from scratch
FROM golang:1.21

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/encryptor .

# Expose port 8003 to the outside world
EXPOSE 8003

# Command to run the executable
CMD ["./encryptor"]
