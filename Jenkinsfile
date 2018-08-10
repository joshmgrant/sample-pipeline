pipeline {
    agent any

    stages {
        stage('Run Static Code Analysis') {
            steps {
                sh "npm install"
                sh 'npm run lint'
            }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'npm run test-single-run'
            }
        }
        stage('Deploy Application') {
            steps {
            	sh 'npm start &'
            }
        }
        stage('Run Functional Tests') {
            steps {
                sauce('e16593fe-6899-463b-9595-e5ba5eb46563') {
                    sauceconnect(options: '', sauceConnectPath: '', useGeneratedTunnelIdentifier: true) {
                         sh 'npm run protractor'
                    }   
                }
            }
        }
    }
}