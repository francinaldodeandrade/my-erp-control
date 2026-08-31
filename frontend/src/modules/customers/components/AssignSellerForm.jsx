import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { customersApi } from "../../../api/customers.api";

import useSellers from "../../sellers/hooks/useSellers";

export default function AssignSellerPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useSellers();

  const [customer, setCustomer] =
    useState(null);

  const [sellerId, setSellerId] =
    useState("");

  const sellers =
    data?.data || [];

  useEffect(() => {
    async function loadCustomer() {
      try {
        const response =
          await customersApi.getById(id);

        const customerData =
          response.data.data;

        setCustomer(customerData);

        if (customerData.sellerId) {
          setSellerId(
            customerData.sellerId
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCustomer();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await customersApi.assignSeller(
        id,
        sellerId
      );

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      alert(
        "Vendedor vinculado com sucesso."
      );

      navigate("/customers");
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Erro ao vincular vendedor."
      );
    }
  }

  if (!customer) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Vincular Vendedor</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Cliente</h3>

        <p>
          <strong>Nome:</strong>{" "}
          {customer.name}
        </p>

        <p>
          <strong>CPF/CNPJ:</strong>{" "}
          {customer.cpfCnpj ||
            "Não informado"}
        </p>

        <p>
          <strong>Cidade:</strong>{" "}
          {customer.city ||
            "Não informada"}
        </p>

        <p>
          <strong>
            Vendedor Atual:
          </strong>{" "}
          {customer.seller?.name ||
            "Não vinculado"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Novo Vendedor
          </label>

          <br />

          <select
            value={sellerId}
            onChange={(e) =>
              setSellerId(
                e.target.value
              )
            }
          >
            <option value="">
              Selecione um vendedor
            </option>

            {sellers.map((seller) => (
              <option
                key={seller.id}
                value={seller.id}
              >
                {seller.name}
              </option>
            ))}
          </select>
        </div>

        <br />

        <button type="submit">
          Salvar Vinculação
        </button>
      </form>
    </div>
  );
}