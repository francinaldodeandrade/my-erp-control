import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { usersApi } from "../../../api/users.api";
// import { roleLabels } from "../../../utils/roleLabels";

export default function UserTable({ users }) {
  const queryClient = useQueryClient();

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Deseja realmente excluir este usuário?"
    );

    if (!confirmed) return;

    try {
      await usersApi.remove(id);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error) {
      console.log(error.response?.data);

      alert(
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );
    }
  }

  async function handleToggle(user) {
    try {
      await usersApi.toggleActive(
        user.id,
        !user.active
      );

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error) {
  const message =
    error?.response?.data?.message;

  if (
    message ===
    "O sistema deve possuir ao menos um administrador ativo."
  ) {
    alert(
      "Não é possível desativar o último administrador do sistema."
    );

    return;
  }

  alert(
    message ||
      "Erro ao alterar status do usuário."
  );
}}

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Perfil</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>{user.role?.name}</td>
            
            <td>
              <span
                style={{
                  color: user.active
                    ? "green"
                    : "red",
                  fontWeight: "bold",
                }}
              >
                {user.active
                  ? "🟢 Ativo"
                  : "🔴 Inativo"}
              </span>
            </td>

            <td>
              <Link
                to={`/users/${user.id}/edit`}
              >
                Editar
              </Link>

              {" | "}

              <button
                onClick={() =>
                  handleToggle(user)
                }
              >
                {user.active
                  ? "Desativar"
                  : "Ativar"}
              </button>

              {" | "}

              <button
                onClick={() =>
                  handleDelete(user.id)
                }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}