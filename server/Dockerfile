# Use a base image with Java 17 pre-installed
FROM openjdk:17-oracle

# Set the working directory inside the container
WORKDIR /app

# Copy the Java application JAR file into the container
COPY build/libs/demo-0.0.1-SNAPSHOT.jar /app/my-java-app.jar

# Expose the port that the application will run on
EXPOSE 8001

# Command to run the Java application when the container starts
CMD ["java", "-jar", "my-java-app.jar"]