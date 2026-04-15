# SauceDemo Automation Testing with Playwright & Jenkins CI/CD

This repository contains a professional automated testing framework for the [SauceDemo](https://www.saucedemo.com/) website. It utilizes **Playwright** with **TypeScript**, follows the **Page Object Model (POM)** design pattern, and leverages **Fixtures** with **BDD (Cucumber)** for scalable, high-performance automation.

## 🚀 Key Features

- **Playwright Fixtures**: Uses dependency injection to manage Page Objects and test state, eliminating boilerplate code.
- **Dynamic Data Validation**: Real-time calculation of cart totals based on user selection to verify checkout accuracy.
- **UI-API Integration**: Cross-layer verification that ensures the website's product catalog matches a master data source.
- **Full API CRUD**: Comprehensive testing of `GET`, `POST`, `PUT`, and `DELETE` methods using JSONPlaceholder.
- **Jenkins CI/CD**: Automated pipeline configured via `Jenkinsfile` for continuous validation.
- **Dockerized Infrastructure**: Consistent environment for Jenkins and Playwright execution.
- **Data-Driven Testing**: Centralized credential and test data management in `testData.json`.

## 🛠 Tech Stack

- **Language**: TypeScript
- **Testing Framework**: Playwright
- **BDD Engine**: `playwright-bdd` (Cucumber/Gherkin)
- **CI/CD**: Jenkins
- **Containerization**: Docker & Docker Compose

## 📦 Project Structure

- `src/pages`: Page Object Model classes.
- `src/test/features`: Gherkin scenarios for Login, Cart, Purchase, Logout, and API.
- `src/test/steps`: Step definitions with fixture injection.
- `src/test/fixtures`: Centralized fixtures for Page Objects and `cartState`.
- `src/test/data`: `testData.json` for environment-specific data.
- `Jenkinsfile`: Defines the automated CI/CD pipeline.
- `docker-compose.yml`: Local setup for Jenkins and Docker-in-Docker.

## ⚙️ How to Run Locally

### 1. Prerequisites
- Node.js (v16+)
- Docker & Docker Compose

### 2. Manual Test Execution
```bash
# Install dependencies
npm install

# Run all tests (BDD Generation + Execution)
npm test
```

### 3. Running Jenkins CI/CD
1. Start Jenkins with Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
2. Retrieve the initial admin password:
   ```bash
   docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Create a Pipeline job in Jenkins pointing to this repository.

## 📊 Reporting
Playwright generates a detailed HTML report after each run. In Jenkins, these are automatically archived and viewable under the **Playwright Report** section.

---
*Developed with a focus on Maintainability, Scalability, and Precision.*
