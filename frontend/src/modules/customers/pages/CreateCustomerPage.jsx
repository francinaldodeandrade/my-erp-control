// import CustomerForm from "../components/CustomerForm";

// export default function CreateCustomerPage() {
//   return (
//     <div>
//       <h1>Novo Cliente</h1>

//       <CustomerForm />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { customersApi } from "../../../api/customers.api";

import CustomerForm from "../components/CustomerForm";

export default function EditCustomerPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [customer, setCustomer] =
    useState(null);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const response =
          await customersApi.getById(id);

        setCustomer(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadCustomer();
  }, [id]);

  async function handleUpdate(data) {
    try {
      await customersApi.update(
        id,
        data
      );

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      alert(
        "Cliente atualizado com sucesso"
      );

      navigate("/customers");
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Erro ao atualizar cliente"
      );
    }
  }

  if (!customer) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Editar Cliente</h1>

      <CustomerForm
        initialData={customer}
        onSubmit={handleUpdate}
      />
    </div>
  );
}