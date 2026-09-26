import { useState } from "react";
import { Link } from "react-router-dom";

import PageContainer from "../../../layouts/PageContainer";
import PageHeader from "../../../layouts/PageHeader";

import useCustomers from "../hooks/useCustomers";

import CustomersStats from "../components/CustomersStats";
import CustomerTable from "../components/CustomerTable";

export default function CustomersPage() {
  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const {
    data,
    isLoading,
  } = useCustomers({
    page,
    search,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Clientes"
        actions={
          <Link to="/customers/new">
            Novo Cliente
          </Link>
        }
      />

      <input
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <CustomersStats
        customers={
          data?.customers || []
        }
      />

      <CustomerTable
        customers={
          data?.customers || []
        }
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Anterior
        </button>

        <span>
          Página {data?.page}
        </span>

        <button
          disabled={
            page >= data?.totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
        >
          Próxima
        </button>
      </div>
    </PageContainer>
  );
}