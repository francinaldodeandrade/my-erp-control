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

9. Fluxo diário
9.1 - git checkout develop
      git add .
      git commit -m "feat: sales module"
      git push origin develop

10. depois que validar
10.1 - git checkout main
       git merge develop
       git push origin main

11. Criar a tag       
git tag -a v0.1.0 -m "ERP Foundation"

12. Verificar as tags
git tag

13. enviar tag para o GitHub
git push origin v0.1.0

14. Ver detalhes da tag
git show v0.1.0