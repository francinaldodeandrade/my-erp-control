1. Inicializar Git
git init

2. Criar .gitignore na raiz
nano .gitignore

conteúdo:

# Node
node_modules/

# Logs
logs/
*.log
npm-debug.log*

# Environment
.env
.env.local
.env.production

# Prisma
generated/

# Build
dist/
build/

# VSCode
.vscode/

# OS
.DS_Store
Thumbs.db

# Coverage
coverage/

# Cache
.cache/

3. Adicionar tudo
git add .

4. Primeiro commit
git commit -m "feat: initial erp foundation"

5. Criar repositório no GitHub
New Repository
erp-control

Não marque:
README
.gitignore
License

porque já temos tudo local.

6. Conectar ao GitHub

git remote add origin \
https://github.com/SEU_USUARIO/erp-control.git

Verificar:
git remote -v

7. Definir branch principal
git branch -M main

8. Enviar
git push -u origin main