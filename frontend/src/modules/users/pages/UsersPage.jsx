import { useState } from "react";
import { Link } from "react-router-dom";

import useUsers from "../hooks/useUsers";
import UserTable from "../components/UserTable";
import UsersStats from "../components/UsersStats";

export default function UsersPage() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const pageSize = 10;

  const {
    data,
    isLoading,
  } = useUsers();

//   const totalUsers =
//   data?.length || 0;

// const activeUsers =
//   data?.filter(
//     (user) => user.active
//   ).length || 0;

// const inactiveUsers =
//   data?.filter(
//     (user) => !user.active
//   ).length || 0;

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const filteredUsers =
    data?.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "all"
          ? true
          : status === "active"
          ? user.active
          : !user.active;

      return (
        matchesSearch &&
        matchesStatus
      );
    }) || [];

  const paginatedUsers =
    filteredUsers.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  const totalPages =
    Math.ceil(
      filteredUsers.length /
        pageSize
    ) || 1;

  return (
    <div>
      <h1>Usuários</h1>

      <UsersStats
  users={data || []}
/>
      <Link to="/users/new">
        Novo Usuário
      </Link>

      <br />
      <br />

      <input
        placeholder="Buscar usuário..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="all">
          Todos
        </option>

        <option value="active">
          Ativos
        </option>

        <option value="inactive">
          Inativos
        </option>
      </select>

      <br />
      <br />

      <UserTable
        users={paginatedUsers}
      />

      <br />

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
      >
        Anterior
      </button>

      <span
        style={{
          margin: "0 10px",
        }}
      >
        Página {page} de{" "}
        {totalPages}
      </span>

      <button
        disabled={
          page >= totalPages
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