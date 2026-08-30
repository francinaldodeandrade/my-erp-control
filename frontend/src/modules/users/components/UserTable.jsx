import { Link } from "react-router-dom";
import { usersApi } from "../../../api/users.api";

async function handleDelete(id) {
  const confirmed = window.confirm(
    "Deseja realmente excluir este usuário?"
  );

  if (!confirmed) return;

  try {
    await usersApi.remove(id);

    window.location.reload();
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

    window.location.reload();
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

export default function UserTable({
  users,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Perfil</th>
          <th>Ativo</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>
              {user.role?.name}
            </td>

            <td>
              {user.active
                ? "Sim"
                : "Não"}
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