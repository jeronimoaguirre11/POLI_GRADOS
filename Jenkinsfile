pipeline {
  agent any
  options { timestamps() }
  environment {
    COMPOSE_PROJECT_NAME = 'poli-grados-ci'
    COMPOSE_PARALLEL_LIMIT = '3'
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Preparar entorno') {
      steps { sh 'cp -n .env.example .env || true' }
    }
    stage('Validar compose') {
      steps { sh 'docker compose config -q' }
    }
    stage('Build de imágenes') {
      steps {
        retry(2) { sh 'docker compose build' }
      }
    }
  }
}