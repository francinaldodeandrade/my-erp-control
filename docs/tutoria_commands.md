1. cd ~/my_erp/erp_control/backend

2. Reativar integração WSL

No Docker Desktop:

Settings

→ Resources

→ WSL Integration

Marque:
✅ Enable integration with my default WSL distro
✅ Ubuntu

Depois clique em:
Apply & Restart

3. Reiniciar o WSL

No PowerShell do Windows:
PowerShell
wsl --shutdown

Feche o terminal Ubuntu e abra novamente.

Ativar o cantainer

docker start postgres-erp-control

login

   curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{
    "email": "admin@erpcontrol.local",
    "password": "Naldo@2026"
  }'

4. Testar

No Ubuntu:

Shell
docker --version

Shell
docker ps

5. Verificar PostgreSQL

Quando o Docker voltar:

Shell
docker ps -a

Procure:
postgres-erp-control
Mostrar mais linhas

Se estiver parado:

Shell
docker start postgres-erp-control

6. Testar Prisma

Quando o banco estiver online:

Shell
npx prisma validate

Depois:

Shell
npx prisma migrate dev --name password_security
E por fim:

Shell
npx prisma generate

Shell
docker --version

Shell
docker ps -a

2. Verifique todos os containers
Shell
docker ps -a

postgres-erp-control Exited (...)

inicie-o:

Shell
docker start postgres-erp-control

3. Teste a conexão

Shell
docker exec -it postgres-erp-control \
psql -U "naldo.dev" -d erp_control

Se entrar no PostgreSQL:
erp_control=#

Saia:

SQL
\q

4. Verifique a variável DATABASE_URL

Execute para verificar o conteudo do arquivo:
Shell
cat .env

Shell
DATABASE_URL="postgresql:naldodev:SENHA@localhost:5432/erp_control"

5. Teste novamente

Quando o banco estiver online:
Shell
npx prisma validate


verificar arquivos no schema.prisma
Shell
npx prisma migrate dev --name password_security

8. buscar um modulo no schema.prisma
grep -A 30 -B 10 "model Customer" prisma/schema.prisma

9. atualizar o schema após alteração
npx prisma format
npx prisma migrate dev --name customer_improvements
npx prisma generate

9. entrar no postgress
docker exec -it postgres-erp-control psql -U "naldo.dev" -d erp_control
