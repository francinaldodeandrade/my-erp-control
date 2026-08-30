import useUsers from "../hooks/useUsers";

import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";

export default function UsersPage() {

  const {
    data,
    isLoading,
  } = useUsers();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>

      <h1>
        Usuários
      </h1>

      <UserTable
        users={data}
      />

      <Link to="/users/new">
  Novo Usuário
</Link>

    </div>
  );
}