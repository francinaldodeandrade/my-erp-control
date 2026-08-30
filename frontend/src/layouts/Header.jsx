import { authApi } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const {
    user,
    logout,
  } = useAuth();

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }

    logout();
  }

  return (
    <header>
      <span>
        {user?.name}
      </span>

      <button onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
}