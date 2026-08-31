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

Criar ordem de produção
   
   curl -X POST http://localhost:3000/production-orders \
-H "Content-Type: application/json" \
-d '{
  "finishedProductId": "1f784212-a992-4cb0-bea8-843cbaee7e68",
  "formulaId": "fb29d4e2-7593-43f4-a4d3-b603cbf00c1b",
  "plannedQuantity": 100,
  "notes": "Produção piloto PA001"
}'

Criar Ordem de Produção
   curl -X POST http://localhost:3000/production-orders \
-H "Content-Type: application/json" \
-d '{
  "finishedProductId": "ID_DO_PA001",
  "formulaId": "ID_DA_FORMULA",
  "plannedQuantity": 100,
  "notes": "Produção piloto"
}'

Criar formula
  curl -X POST http://localhost:3000/formulas \
-H "Content-Type: application/json" \
-d '{
  "finishedProductId": "1f784212-a992-4cb0-bea8-843cbaee7e68",
  "version": 1,
  "notes": "Ficha técnica padrão do pão de forma tradicional",
  "items": [
    {
      "componentType": "RAW_MATERIAL",
      "rawMaterialId": "aeeb6f6d-f26d-49ff-9336-4ae6f37f8106",
      "quantity": 1.000
    },
    {
      "componentType": "RAW_MATERIAL",
      "rawMaterialId": "7e9ec3dd-4f2e-4c4b-bad3-189c5f9056fa",
      "quantity": 0.020
    },
    {
      "componentType": "RAW_MATERIAL",
      "rawMaterialId": "7fd76b65-6076-4f07-8b4d-aa50e44a5ca5",
      "quantity": 0.030
    },
    {
      "componentType": "RAW_MATERIAL",
      "rawMaterialId": "d2758b71-2ee4-4578-9565-a268c3871353",
      "quantity": 0.050
    },
    {
      "componentType": "RAW_MATERIAL",
      "rawMaterialId": "2bb18248-ce1b-4999-abdd-0d7c45f8f65d",
      "quantity": 0.010
    }
  ]
}'

Criar estoque vendedor
  curl -X POST http://localhost:3000/stock-distributions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN" \
-d '{
  "sellerId":"f59e2677-072a-446a-887d-efb7fe6793b6",
  "finishedProductId":"1f784212-a992-4cb0-bea8-843cbaee7e68",
  "distributedById":"57da6f41-7da6-45ee-9710-a4cce3c2df9b",
  "quantity":10,
  "notes":"Teste SellerStock"
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

10. buscar trechos:
sed -n '730,860p' prisma/schema.prisma

grep -A 120 "model ProductFormula" prisma/schema.prisma

11.  abrir arquivos em massa
     cat src/main.jsx && \
echo "================================" && \
cat src/routes/AppRoutes.jsx && \
echo "================================" && \
cat src/routes/PrivateRoute.jsx && \
echo "================================" && \
cat src/contexts/AuthProvider.jsx