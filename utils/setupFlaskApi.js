const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')

function safeExec(command, description) {
  try {
    console.log(`\n▶️ ${description}`)
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`\n❌ Erro ao executar: ${command}`)
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = function setupFlaskApi(projectName, options = {}) {
  const projectPath = path.resolve(projectName)
  if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath)
  process.chdir(projectPath)

  // 1. Cria virtualenv
  const pythonCmd = process.platform === 'win32' ? 'py' : 'python'
  safeExec(`${pythonCmd} -m venv venv`, 'Criando ambiente virtual')

  // 2. Instala dependências
  const requirements = [
    'flask',
    'flask-jwt-extended',
    'flask-cors',
    'python-dotenv',
    'black',
    'flake8',
    'isort',
    'pytest',
    'pre-commit'
  ]

  if (options.mongo) requirements.push('pymongo')
  if (options.pandas) requirements.push('pandas')
  if (options.nltk) requirements.push('nltk')

  fs.writeFileSync('requirements.txt', requirements.join('\n'))

  const pipCmd = process.platform === 'win32' ? 'venv\\Scripts\\pip.exe' : 'venv/bin/pip'
  safeExec(`${pipCmd} install -r requirements.txt`, 'Instalando dependências')

  // 3. Inicializa Git
  safeExec('git init', 'Inicializando repositório Git')

  // 4. Cria estrutura de pastas base
  const folders = ['app', 'app/routes', 'app/models', 'app/services', 'config', 'tests']
  folders.forEach(folder => fs.mkdirSync(folder, { recursive: true }))

  // 5. Cria arquivos base
  fs.writeFileSync('app/__init__.py', `from flask import Flask\nfrom flask_jwt_extended import JWTManager\nfrom flask_cors import CORS\nfrom config.settings import Config\n\ndef create_app():\n    app = Flask(__name__)\n    app.config.from_object(Config)\n\n    CORS(app)\n    JWTManager(app)\n\n    from app.routes import main as main_blueprint\n    app.register_blueprint(main_blueprint)\n\n    return app\n`)

  fs.writeFileSync('config/settings.py', `import os\n\nclass Config:\n    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')\n    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret')\n    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/tweets')\n`)

  fs.writeFileSync('app/routes/__init__.py', `from flask import Blueprint\n\nmain = Blueprint('main', __name__)\n\n@main.route('/')\ndef index():\n    return {'message': 'API Flask ativa!'}\n`)

  fs.writeFileSync('run.py', `from app import create_app\n\napp = create_app()\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`)

  fs.writeFileSync('.gitignore', `# Ambiente virtual\nvenv/\n\n# Cache do Python\n__pycache__/\n*.py[cod]\n\n# Arquivos de ambiente\n.env\n.env.*\n\n# Logs\n*.log\n\n# IDEs e editores\n.vscode/\n.idea/\n\n# Testes\n.coverage\npytest_cache/\nhtmlcov/\n`)

  fs.writeFileSync('.env.example', `SECRET_KEY=your_secret_key\nJWT_SECRET_KEY=your_jwt_secret\nMONGO_URI=mongodb://localhost:27017/tweets\n`)

  fs.writeFileSync('.flake8', `[flake8]\nmax-line-length = 88\nexclude = venv, __pycache__, .git, *.pyc, *.egg-info, dist\n`)

  fs.writeFileSync('tests/__init__.py', '')
  fs.writeFileSync('tests/test_base.py', `def test_root():\n    assert True\n`)

  fs.writeFileSync('Makefile', `run:\n\tvenv/Scripts/python run.py\n\nformat:\n\tblack .\n\tisort .\n\nlint:\n\tflake8\n\ntest:\n\tpytest\n`)

  fs.writeFileSync('.pre-commit-config.yaml', `repos:\n  - repo: https://github.com/psf/black\n    rev: stable\n    hooks:\n      - id: black\n  - repo: https://github.com/pre-commit/mirrors-isort\n    rev: v5.12.0\n    hooks:\n      - id: isort\n  - repo: https://github.com/pre-commit/mirrors-flake8\n    rev: v6.1.0\n    hooks:\n      - id: flake8\n`)

  const preCommitCmd = process.platform === 'win32' ? 'venv\\Scripts\\pre-commit.exe' : 'venv/bin/pre-commit'
  safeExec(`${preCommitCmd} install`, 'Instalando hook do pre-commit')

  fs.writeFileSync('README.md', `# ${projectName}

## Descrição
API Flask, JWT${options.mongo ? ', MongoDB' : ''}${options.pandas ? ', Pandas' : ''}${options.nltk ? ', NLTK' : ''}.

## Estrutura do projeto

- \`app/\`: aplicação principal (rotas, modelos, serviços)
- \`config/\`: configurações do sistema
- \`run.py\`: ponto de entrada da aplicação
- \`tests/\`: testes automatizados com pytest
- \`venv/\`: ambiente virtual Python
- \`requirements.txt\`: dependências do projeto

## Instruções

### 1. Ativar ambiente virtual:

Windows:
\`\`\`
venv\Scripts\activate
\`\`\`
Linux/macOS:
\`\`\`
source venv/bin/activate
\`\`\`

### 2. Rodar a aplicação:
\`\`\`
make run
\`\`\`

### 3. Rodar os testes:
\`\`\`
make test
\`\`\`

### 4. Analisar e formatar o código:
\`\`\`
make lint
make format
\`\`\`

### 5. Pre-commit:
\`\`\`
pre-commit run --all-files
\`\`\`

## Autor
Gerado automaticamente por script.`)

  console.log(`\n✅ Projeto Flask '${projectName}' criado com sucesso!`)
  console.log(`\n👉 Ative o ambiente virtual com:`)
  console.log(`venv\\Scripts\\activate`)
  console.log(`\n🚀 Rode a aplicação com:`)
  console.log(`python run.py`)
  console.log(`\n🚀 Para testar:`)
  console.log(`pytest`)
  console.log(`\n🚀 Para formatar o código::`)
  console.log(`\n black .`)
  console.log(`\n isort `)
  console.log(`\n flaske8`)
}
