import { useState } from "react";

import { usersApi } from "../../../api/users.api";
import useRoles from "../../roles/hooks/useRoles";

export default function UserForm({
  initialData = null,
  onSubmit = null,
}) {
  const { data: roles } = useRoles();

  const [name, setName] = useState(
    initialData?.name || ""
  );

  const [email, setEmail] = useState(
    initialData?.email || ""
  );

  const [password, setPassword] =
    useState("");

  const [role, setRole] = useState(
    initialData?.role?.name ||
      initialData?.role ||
      ""
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      email,
      role,
    };

    if (password) {
      payload.password = password;
    }

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await usersApi.create({
          ...payload,
          password,
        });

        alert(
          "Usuário criado com sucesso"
        );

        setName("");
        setEmail("");
        setPassword("");
        setRole("");
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Erro ao salvar usuário"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div>
        <label>Senha</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Perfil</label>

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="">
            Selecione um perfil
          </option>

          {roles?.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">
        {initialData
          ? "Atualizar"
          : "Salvar"}
      </button>
    </form>
  );
}