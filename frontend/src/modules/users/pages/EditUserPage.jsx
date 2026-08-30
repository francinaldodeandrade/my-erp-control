// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { usersApi } from "../../../api/users.api";

// import UserForm from "../components/UserForm";

// export default function EditUserPage() {
//   const { id } = useParams();

//   const [user, setUser] =
//     useState(null);

//   useEffect(() => {
//     async function loadUser() {
//       const response =
//         await usersApi.getById(id);

//       setUser(response.data);
//     }

//     loadUser();
//   }, [id]);

//   async function handleUpdate(
//     data
//   ) {
//     await usersApi.update(
//       id,
//       data
//     );

//     alert(
//       "Usuário atualizado"
//     );
//   }

//   if (!user) {
//     return <p>Carregando...</p>;
//   }

//   return (
//     <div>
//       <h1>
//         Editar Usuário
//       </h1>

//       <UserForm
//         initialData={user}
//         onSubmit={handleUpdate}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usersApi } from "../../../api/users.api";

import UserForm from "../components/UserForm";

export default function EditUserPage() {
  const { id } = useParams();

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

      alert("Usuário atualizado com sucesso");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Erro ao atualizar usuário"
      );
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