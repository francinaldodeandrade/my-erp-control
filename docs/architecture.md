# Arquitetura do Sistema

## Backend

Node.js + Express

## Frontend

React + Vite

## Banco

PostgreSQL + Prisma

---

## Arquitetura Principal

React
↓
API Express
↓
Prisma ORM
↓
PostgreSQL

---

## Arquitetura Offline

PWA
↓
IndexedDB
↓
Sync Queue
↓
API
↓
PostgreSQL

---

## Estrutura Backend

src/

modules/
auth/
users/
roles/
permissions/

controllers/
services/
repositories/
middlewares/
validators/
routes/

---

## Estrutura Frontend

src/

pages/
components/
layouts/
services/
hooks/
contexts/
modules/
routes/

---

## Banco de Dados

### Segurança

users
roles
permissions
role_permissions
user_sessions
audit_logs
devices

### Cadastros

customers
suppliers

### Estoque

raw_materials
raw_material_lots

finished_products
finished_product_lots

maintenance_parts

stock_movements

### Vendas

sales
sale_items
sale_payments

### Financeiro

cash_registers
financial_transactions

### Logística

vehicles
drivers
routes
deliveries

### Manutenção

machines
maintenance_orders
maintenance_items
maintenance_history

### Offline

sync_queue
sync_conflicts

### Dashboard

dashboard_metrics
kpi_history