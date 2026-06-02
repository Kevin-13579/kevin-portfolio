# Step 1: Build the Maven application using Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN ./mvnw clean package -DskipTests

# Step 2: Run the built JAR file using a lightweight Java 21 runtime
FROM eclipse-temurin:21-jre
COPY --from=build /target/kevin-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]