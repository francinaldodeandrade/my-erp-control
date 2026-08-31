export default function UsersStats({
  users = [],
}) {
  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) => user.active
    ).length;

  const inactiveUsers =
    users.filter(
      (user) => !user.active
    ).length;

  const roles =
    users.reduce(
      (acc, user) => {
        const role =
          user.role?.name ||
          "Sem Perfil";

        acc[role] =
          (acc[role] || 0) + 1;

        return acc;
      },
      {}
    );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      <div>
        <strong>Total</strong>
        <p>{totalUsers}</p>
      </div>

      <div>
        <strong>Ativos</strong>
        <p>{activeUsers}</p>
      </div>

      <div>
        <strong>Inativos</strong>
        <p>{inactiveUsers}</p>
      </div>

      {Object.entries(roles).map(
        ([role, total]) => (
          <div key={role}>
            <strong>{role}</strong>
            <p>{total}</p>
          </div>
        )
      )}
    </div>
  );
}
