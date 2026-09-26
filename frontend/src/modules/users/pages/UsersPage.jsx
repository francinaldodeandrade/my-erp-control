import { useState } from "react";
import { Link } from "react-router-dom";

import PageContainer from "../../../layouts/PageContainer";
import PageHeader from "../../../layouts/PageHeader";

import useUsers from "../hooks/useUsers";

import UsersStats from "../components/UsersStats";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  const [search, setSearch] =
    useState("");

  const {
    data: users = [],
    isLoading,
  } = useUsers();

  const filteredUsers =
    users.filter((user) =>
      user.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Usuários"
        actions={
          <Link to="/users/new">
            Novo Usuário
          </Link>
        }
      />

      <input
        placeholder="Buscar usuário..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <UsersStats
        users={filteredUsers}
      />

      <UserTable
        users={filteredUsers}
      />
    </PageContainer>
  );
}