pipeline {
    agent {
        // Using a Docker agent is highly professional as it ensures a consistent environment
        docker {
            image 'mcr.microsoft.com/playwright:v1.43.0-jammy'
        }
    }

    stages {
        stage('Setup') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Runs bddgen and playwright test as defined in package.json
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Archive the Playwright report to view in Jenkins
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            // If the HTML Publisher plugin is installed, you can use:
            // publishHTML(target: [
            //     reportDir: 'playwright-report',
            //     reportFiles: 'index.html',
            //     reportName: 'Playwright Report'
            // ])
        }
    }
}
