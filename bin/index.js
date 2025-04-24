#!/usr/bin/env node

const setupFlaskApi = require('../utils/setupFlaskApi')
const args = process.argv.slice(2)
const projectName = args[0] || 'flask-api'

if (/[^a-zA-Z0-9-_]/.test(projectName)) {
    console.error('❌ O nome do projeto contém caracteres inválidos. Use apenas letras, números, hífens e underlines.')
    process.exit(1)
}

setupFlaskApi(projectName)
    .then(() => {
        console.log(`✅ Projeto '${projectName}' configurado com sucesso!`)
    })
    .catch((error) => {
        console.error(`❌ Ocorreu um erro ao configurar o projeto '${projectName}':`, error)
        process.exit(1)
    })
