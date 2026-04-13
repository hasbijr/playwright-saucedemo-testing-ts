# SauceDemo Automation Testing with Playwright & Jenkins CI/CD

This repository contains a professional automated testing framework for the [SauceDemo](https://www.saucedemo.com/) website. It uses **Playwright** with **TypeScript** and follows the **Page Object Model (POM)** design pattern, integrating **BDD (Cucumber)** for readable test scenarios.

## 🚀 Features
- **Playwright BDD**: Gherkin-style test scenarios using `playwright-bdd`.
- **Page Object Model**: Maintainable and reusable code structure.
- **Jenkins CI/CD**: Automated pipeline configured via `Jenkinsfile`.
- **Dockerized Environment**: Jenkins and Playwright run in Docker containers for consistency.
- **HTML Reporting**: Automated Playwright reports archived and viewable in Jenkins.

## 🛠 Tech Stack
- **Language**: TypeScript
- **Testing Framework**: Playwright
- **BDD**: Cucumber / Gherkin
- **CI/CD**: Jenkins
- **Infrastructure**: Docker & Docker Compose

## 📦 Project Structure
- `src/pages`: Page Object classes.
- `src/test/features`: Gherkin feature files.
- `src/test/steps`: Step definitions for Cucumber scenarios.
- `Jenkinsfile`: Defines the CI/CD pipeline stages.
- `docker-compose.yml`: Set up Jenkins with Docker-in-Docker support.
- `Dockerfile`: Custom Jenkins image with Docker CLI installed.

## ⚙️ How to Run Locally

### 1. Prerequisites
- Node.js installed
- Docker & Docker Compose installed

### 2. Manual Test Execution
```bash
npm install
npm test
```

### 3. Running Jenkins CI/CD
1. Start Jenkins using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
2. Access Jenkins at `http://localhost:8080`.
3. Follow the setup instructions (retrieve initial admin password via `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`).
4. Install **Docker Pipeline** and **HTML Publisher** plugins.
5. Create a **Pipeline** job pointing to this repository.

## 📊 Reports
After each Jenkins build, the Playwright HTML report is archived. You can view it directly in the Jenkins UI under the **Playwright Report** link (requires HTML Publisher plugin).

---
*Created with ❤️ for Automation Excellence.*
