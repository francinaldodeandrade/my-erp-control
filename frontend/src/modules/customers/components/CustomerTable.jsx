import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { customersApi } from "../../../api/customers.api";

export default function CustomerTable({
  customers,
}) {
  const queryClient =
    useQueryClient();

  async function handleActivate(id) {
    try {
      await customersApi.activate(id);

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeactivate(id) {
    try {
      await customersApi.deactivate(id);

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF/CNPJ</th>
          <th>Cidade</th>
          <th>Vendedor</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {customers?.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>

            <td>
              {customer.cpfCnpj}
            </td>

            <td>{customer.city}</td>

            <td>
              {customer.seller?.name ||
                "Não vinculado"}
            </td>

            <td>
              {customer.active ? (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  🟢 Ativo
                </span>
              ) : (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  🔴 Inativo
                </span>
              )}
            </td>

            <td>
              <Link
                to={`/customers/${customer.id}/edit`}
              >
                Editar
              </Link>

              {" | "}

              <Link
                to={`/customers/${customer.id}/assign-seller`}
              >
                Vendedor
              </Link>

              {" | "}

              {customer.active ? (
                <button
                  onClick={() =>
                    handleDeactivate(
                      customer.id
                    )
                  }
                >
                  Desativar
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleActivate(
                      customer.id
                    )
                  }
                >
                  Ativar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}