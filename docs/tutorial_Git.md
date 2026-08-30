1. Verificar pendências
Shell
1
git status
Mostrar mais linhas
2. Adicionar tudo
Shell
1
git add -A
Mostrar mais linhas
3. Criar commit
Shell
1
git commit -m "feat: complete sales distribution and financial workflow"
Mostrar mais linhas

ou:

Shell
1
git commit -m "release: v1.7.0 operational workflow completed"
Mostrar mais linhas
4. Enviar a develop

Como você está trabalhando na develop:

Shell
1
git push origin develop
Mostrar mais linhas
5. Fazer merge para main
Shell
1
git checkout main
2
git pull origin main
3
git merge develop
Mostrar mais linhas

Se não houver conflitos:

Shell
1
git push origin main
Mostrar mais linhas
6. Criar tag
Shell
1
git tag -a v1.7.0 -m "ERP Control v1.7.0"
Mostrar mais linhas

Enviar:

Shell
1
git push origin v1.7.0
Mostrar mais linhas

ou:

Shell
1
git push origin --tags
2
`