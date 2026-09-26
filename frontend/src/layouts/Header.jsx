import { authApi } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

export default function Header({
  setSidebarOpen, sidebarOpen,
}) {
  const { user, logout } =
    useAuth();

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error(error);
    }

    logout();
  }

  console.log(
  "HEADER",
  sidebarOpen
);

  return (
    <header className="header">
      <div className="header-left">
        {/* <button
  className="mobile-menu-btn"
  onClick={() =>
    setSidebarOpen(!sidebarOpen)
  }
>
  {sidebarOpen ? "✕" : "☰"}
</button> */}

<button
className="mobile-menu-btn"
onClick={() => {
console.log("clicou");
setSidebarOpen(
(prev) => !prev
);
}}
>
{sidebarOpen ? "✕" : "☰"}
</button>

        <h3>ERP Control</h3>
      </div>

      <div className="header-right">
        <div className="user-info">
          <strong>
            {user?.name}
          </strong>

          <span>
            {user?.role?.name}
          </span>
        </div>

        <button
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </header>
  );
}
