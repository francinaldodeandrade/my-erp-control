import { useState } from "react";
import { Link } from "react-router-dom";

import useCustomers
from "../hooks/useCustomers";

import CustomersStats
from "../components/CustomersStats";

import CustomerTable
from "../components/CustomerTable";

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
    <div>
      <h1>Clientes</h1>

      <input
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <CustomersStats
  customers={
    data?.customers || []
  }
/>

<Link to="/customers/new">
  Novo Cliente
</Link>

<CustomerTable
  customers={
    data?.customers || []
  }
/>

      {/* <pre>
        {JSON.stringify(
          data,
          null,
          2
        )}
      </pre> */}

      

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
          page >=
          data?.totalPages
        }
        onClick={() =>
          setPage(page + 1)
        }
      >
        Próxima
      </button>
    </div>
  );
}