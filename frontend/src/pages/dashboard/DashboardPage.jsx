import DashboardCard from "../../components/DashboardCard";
import useUsers from "../../modules/users/hooks/useUsers";
import useCustomers from "../../modules/customers/hooks/useCustomers";

export default function DashboardPage() {
  const { data: users } =
  useUsers();

const { data: customersData } =
  useCustomers({
    page: 1,
  });

const customers =
  customersData?.customers || [];

  const totalUsers =
  users?.length || 0;

const activeUsers =
  users?.filter(
    (user) => user.active
  ).length || 0;

const totalCustomers =
  customers.length;

const customersWithoutSeller =
  customers.filter(
    (customer) =>
      !customer.sellerId
  ).length;
  return (
    <div>
      <h1>ERP Control</h1>

      <p>
        Bem-vinda ao sistema.
      </p>

      <hr />

      <h2>Administração</h2>
      <DashboardCard
  title="Usuários"
  value={totalUsers}
  description={`${activeUsers} ativos`}
  color="#2563eb"
  link="/users"
/>

<DashboardCard
  title="Clientes"
  value={totalCustomers}
  description={`${customersWithoutSeller} sem vendedor`}
  color="#16a34a"
  link="/customers"
/>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Usuários"
          description="Gerenciar usuários"
          link="/users"
          color="#2563eb"
        />

        <DashboardCard
          title="Perfis"
          description="Perfis do sistema"
          link="/roles"
          color="#7c3aed"
        />

        <DashboardCard
          title="Notificações"
          description="Central de avisos"
          link="/notifications"
          color="#0891b2"
        />
      </div>

      <br />

      <h2>Comercial</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Clientes"
          description="Cadastro de clientes"
          link="/customers"
          color="#16a34a"
        />

        <DashboardCard
          title="Vendedores"
          description="Equipe comercial"
          link="/sellers"
          color="#ea580c"
        />

        <DashboardCard
          title="Vendas"
          description="Pedidos e vendas"
          link="/sales"
          color="#dc2626"
        />
      </div>

      <br />

      <h2>Suprimentos</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Fornecedores"
          description="Cadastro fornecedores"
          link="/suppliers"
          color="#0f766e"
        />

        <DashboardCard
          title="Compras"
          description="Controle compras"
          link="/purchases"
          color="#4f46e5"
        />
      </div>

      <br />

      <h2>Produção</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Matérias-Primas"
          description="Estoque de insumos"
          link="/raw-materials"
          color="#7c2d12"
        />

        <DashboardCard
          title="Fórmulas"
          description="Receitas e formulas"
          link="/formulas"
          color="#9333ea"
        />

        <DashboardCard
          title="Produtos"
          description="Produtos acabados"
          link="/finished-products"
          color="#0284c7"
        />

        <DashboardCard
          title="Ordens Produção"
          description="Produção"
          link="/production-orders"
          color="#ca8a04"
        />
      </div>

      <br />

      <h2>Logística</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Distribuição"
          description="Distribuição de estoque"
          link="/stock-distributions"
          color="#be123c"
        />
      </div>

      <br />

      <h2>Financeiro</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Financeiro"
          description="Fluxo financeiro"
          link="/financial"
          color="#15803d"
        />
      </div>
    </div>
  );
}