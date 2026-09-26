import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  Factory,
  Truck,
  DollarSign,
} from "lucide-react";

export default function Sidebar({sidebarOpen,}) {
  const [openMenus, setOpenMenus] =
    useState({
      administracao: true,
      comercial: true,
      suprimentos: true,
      producao: true,
      logistica: true,
      financeiro: true,
    });

  const [collapsed, setCollapsed] =
  useState(() => {
    return (
      localStorage.getItem(
        "sidebar-collapsed"
      ) === "true"
    );
  });

  function toggleSidebar() {
  const newValue =
    !collapsed;

  setCollapsed(newValue);

  localStorage.setItem(
    "sidebar-collapsed",
    newValue
  );
}

  function toggle(menu) {
  setOpenMenus((prev) => ({
    ...prev,
    [menu]: !prev[menu],
  }));
}



  return (
    
    
    <aside
  className={`
  sidebar
  ${
    collapsed &&
    !sidebarOpen
      ? "collapsed"
      : ""
  }
  ${
    sidebarOpen
      ? "mobile-open"
      : ""
  }
`}
>
  {!sidebarOpen && (
  <button
    className="sidebar-toggle"
    onClick={toggleSidebar}
  >
    ☰
  </button>
)}
     
      {!collapsed && <h2>ERP Control</h2>}

      <nav>
       <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "menu-active"
      : "menu-link"
  }
>
  <LayoutDashboard size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Dashboard
    </span>
  )}

  

</NavLink>

        <button
  className="menu-group"
  onClick={() =>
    toggle("administracao")
  }
>
  <Users size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Administração
    </span>
  )}
</button>

        {openMenus.administracao && (
          <div className="submenu">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Usuários
            </NavLink>

            <NavLink
              to="/roles"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Perfis
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Notificações
            </NavLink>
          </div>
        )}

        <button
  className="menu-group"
  onClick={() =>
    toggle("comercial")
  }
>
  <Briefcase size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Comercial
    </span>
  )}
</button>

        {openMenus.comercial && (
          <div className="submenu">
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Clientes
            </NavLink>

            <NavLink
              to="/sellers"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Vendedores
            </NavLink>

            <NavLink
              to="/sales"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Vendas
            </NavLink>
          </div>
        )}

        <button
         className="menu-group"
  onClick={() =>
    toggle("suprimentos")
  }
>
  <Package size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Suprimentos
    </span>
  )}
        </button>

        {openMenus.suprimentos && (
          <div className="submenu">
            <NavLink
              to="/suppliers"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Fornecedores
            </NavLink>

            <NavLink
              to="/purchases"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Compras
            </NavLink>
          </div>
        )}

        <button
  className="menu-group"
  onClick={() =>
    toggle("producao")
  }
>
  <Factory size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Produção
    </span>
  )}
</button>

        {openMenus.producao && (
          <div className="submenu">
            <NavLink
              to="/raw-materials"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Matérias-Primas
            </NavLink>

            <NavLink
              to="/formulas"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Fórmulas
            </NavLink>

            <NavLink
              to="/finished-products"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Produtos Acabados
            </NavLink>

            <NavLink
              to="/production-orders"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Ordens Produção
            </NavLink>
          </div>
        )}

        <button
  className="menu-group"
  onClick={() =>
    toggle("logistica")
  }
>
  <Truck size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Logística
    </span>
  )}
</button>

        {openMenus.logistica && (
          <div className="submenu">
            <NavLink
              to="/stock-distributions"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Distribuição
            </NavLink>
          </div>
        )}

        <button
  className="menu-group"
  onClick={() =>
    toggle("financeiro")
  }
>
  <DollarSign size={20} />

  {(!collapsed || sidebarOpen) && (
    <span className="menu-label">
      Financeiro
    </span>
  )}
</button>

        {openMenus.financeiro && (
          <div className="submenu">
            <NavLink
              to="/financial"
              className={({ isActive }) =>
                isActive
                  ? "menu-active"
                  : "menu-link"
              }
            >
              Financeiro
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}