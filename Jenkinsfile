pipeline {
  agent any
  options { timestamps() }

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
      steps { sh 'docker compose build' }
    }
  }
}