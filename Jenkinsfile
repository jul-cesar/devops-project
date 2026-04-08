pipeline {
    agent any

    environment {
        BACK_IMAGE = 'localhost:5000/devops-project/backend:latest'
        FRONT_IMAGE = 'localhost:5000/devops-project/frontend:latest'
        DEPLOY_DIR = '/home/jul/devops/deploys'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/jul-cesar/devops-project.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $BACK_IMAGE ./devops-project'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $FRONT_IMAGE ./devops-project-frontend'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $BACK_IMAGE'
                sh 'docker push $FRONT_IMAGE'
            }
        }

        stage('Deploy') {
            steps {
                sh 'cd $DEPLOY_DIR && docker compose pull'
                sh 'cd $DEPLOY_DIR && docker compose up -d'
            }
        }
    }
}