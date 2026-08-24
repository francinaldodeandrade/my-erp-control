# verificar conexão com o banco
1. cat .env | grep DATABASE_URL
2. psql -U postgres -d erp_control

DATABASE_URL="postgresql://postgres:senha@localhost:5432/erp_control"

# Instalar o postgress na maquina:
1. sudo apt update

2. sudo apt install postgresql-client

# Verificar se o psql está instalado
1. psql --version

# Listar tabelas
1. \dt

# Sair do postgress
1. \q

# Uso  do postgress no Docker:
1. docker ps

# Ver as variáveis do container
1. docker inspect postgres-erp-control | grep POSTGRES
2. docker exec -it postgres-erp-control env | grep POSTGRES

Resultado
POSTGRES_USER=Naldo.dev
POSTGRES_DB=postgres-erp-control
POSTGRES_PASSWORD=2310-Fas

# Conectar:
1. POSTGRES_USER=Naldo.dev
2. docker exec -it postgres-erp-control psql -U erp_user -d erp_control

# depois acessar o banco:
1. docker exec -it postgres-erp-control psql -U postgres

# Se não entrar
1. \l

# listar os bancos
\c erp_control
