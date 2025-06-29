# 1. Сборка на основе Maven и Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Копируем файлы Maven и зависимости
COPY pom.xml .
RUN mvn dependency:go-offline

# Копируем всё и собираем проект
COPY . .
RUN mvn clean package -DskipTests

# 2. Рантайм-слой
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Копируем jar из предыдущего слоя
COPY --from=build /app/target/*.jar app.jar

# Указываем порт, который слушает Spring Boot
EXPOSE 8080

# Запуск приложения
ENTRYPOINT ["java", "-jar", "app.jar"]
