import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import useSellers from "../../sellers/hooks/useSellers";

import { customersApi } from "../../../api/customers.api";

export default function AssignSellerPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useSellers();

  const [sellerId, setSellerId] =
    useState("");

  const sellers =
    data?.data || [];

    console.log("SELLERS:", data);


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

  return (
    <div>
      <h1>Vincular Vendedor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Vendedor</label>

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
          Vincular
        </button>
      </form>
    </div>
  );
}