1 Inicializar Git
git init

2 Criar .gitignore na raiz
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