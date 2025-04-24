# Create Flask API CLI

## Descrição

`create-flask-api` é um utilitário em linha de comando (CLI) que automatiza a criação e configuração inicial de projetos Flask com diversas ferramentas e boas práticas integradas, incluindo JWT, MongoDB, Pandas e NLTK (opcionais).

---

## 🚀 Recursos principais

- Criação automática do ambiente virtual Python
- Instalação automática de dependências essenciais
- Configuração automática para Flask com JWT
- Integração opcional com MongoDB, Pandas e NLTK
- Estrutura organizada de pastas e arquivos base
- Ferramentas de lint e formatação de código (`flake8`, `black`, `isort`)
- Testes automatizados com `pytest`
- Hooks pré-configurados para `pre-commit`

---

## 📦 Instalação

Utilize o comando abaixo com `npx` para iniciar rapidamente:

```bash
npx create-flask-api nome-do-projeto [--mongo] [--pandas] [--nltk]
```

### Parâmetros opcionais:

- `--mongo`: instala e configura o suporte ao MongoDB (`pymongo`)
- `--pandas`: instala e configura o suporte ao Pandas
- `--nltk`: instala e configura o suporte ao NLTK

Exemplo:

```bash
npx create-flask-api minha-api --mongo --pandas
```

---

## 📁 Estrutura do projeto gerado

```
minha-api/
├── app/
│   ├── __init__.py
│   ├── models/
│   ├── routes/
│   └── services/
├── config/
│   └── settings.py
├── tests/
│   ├── __init__.py
│   └── test_base.py
├── .env.example
├── .flake8
├── .gitignore
├── .pre-commit-config.yaml
├── Makefile
├── requirements.txt
└── run.py
```

---

## ⚙️ Uso do projeto gerado

### 1. Ative o ambiente virtual:

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/macOS:**
```bash
source venv/bin/activate
```

### 2. Instale dependências adicionais (caso necessário):

```bash
pip install -r requirements.txt
```

### 3. Rodando a aplicação:

```bash
venv\Scripts\python run.py
```

### 4. Executando testes:

```bash
pytest
```

### 5. Formatação e verificação do código:

```bash
flake8
black .
isort .
```

---

## 🌱 Requisitos

- Python 3.8 ou superior
- Node.js (necessário para rodar o CLI com `npx`)

---

## 🤝 Como contribuir

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch com a sua feature ou correção: (`git checkout -b minha-feature`)
3. Faça o commit das suas alterações: (`git commit -m 'feat: minha nova feature'`)
4. Faça o push para a branch: (`git push origin minha-feature`)
5. Abra uma Pull Request no GitHub.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.


### Ajustes e Melhorias:

1. **Clareza nos comandos**: A adição de comandos explícitos para Windows e Linux/macOS no passo de execução da aplicação (`run.py`) ajuda a garantir que os desenvolvedores saibam exatamente como rodar a aplicação em diferentes sistemas operacionais.
   
2. **Exemplo de uso mais claro**: O exemplo de como rodar o `npx` foi melhorado, para garantir que o usuário saiba como passar os parâmetros opcionais corretamente.

3. **Licença**: Se o repositório for open-source, incluir uma seção sobre a licença é uma boa prática, principalmente com a Licença MIT, que é amplamente usada. Se você já tiver um arquivo de licença, isso também é uma boa prática a ser incluída no README.

4. **Padronização**: A seção de contribuições foi padronizada para seguir um fluxo claro de como contribuir com o projeto.

Essas melhorias podem deixar o README mais claro e organizado para novos desenvolvedores que desejam usar ou contribuir para o seu projeto.

Se precisar de mais ajustes ou tiver perguntas sobre o conteúdo do README, estou à disposição!
