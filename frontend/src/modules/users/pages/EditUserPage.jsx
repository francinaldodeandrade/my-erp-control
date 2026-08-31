import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useNavigate,
} from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { usersApi } from "../../../api/users.api";

import UserForm from "../components/UserForm";

export default function EditUserPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response =
          await usersApi.getById(id);

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, [id]);

  async function handleUpdate(data) {
    try {
      await usersApi.update(id, data);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      alert("Usuário atualizado com sucesso");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Erro ao atualizar usuário"
      );

      navigate("/users");
    }
  }

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Editar Usuário</h1>

      <UserForm
        initialData={user}
        onSubmit={handleUpdate}
      />
    </div>
  );
}