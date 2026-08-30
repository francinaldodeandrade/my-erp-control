import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>ERP Control</h2>

      <nav>

        <Link to="/">Dashboard</Link>

        <h4>Operação</h4>

        <Link to="/purchases">
          Compras
        </Link>

        <Link to="/production">
          Produção
        </Link>

        <Link to="/distributions">
          Distribuição
        </Link>

        <Link to="/sales">
          Vendas
        </Link>

        <h4>Cadastros</h4>

        <Link to="/customers">
          Clientes
        </Link>

        <Link to="/suppliers">
          Fornecedores
        </Link>

        <Link to="/raw-materials">
          Matérias-Primas
        </Link>

        <Link to="/finished-products">
          Produtos
        </Link>

        <Link to="/formulas">
          Fórmulas
        </Link>

      </nav>
    </aside>
  );
}