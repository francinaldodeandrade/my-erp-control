export default function CustomersStats({
  customers = [],
}) {
  const total =
    customers.length;

  const active =
    customers.filter(
      (customer) =>
        customer.active
    ).length;

  const inactive =
    customers.filter(
      (customer) =>
        !customer.active
    ).length;

  const withoutSeller =
    customers.filter(
      (customer) =>
        !customer.sellerId
    ).length;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <div>
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div>
        <h3>Ativos</h3>
        <p>{active}</p>
      </div>

      <div>
        <h3>Inativos</h3>
        <p>{inactive}</p>
      </div>

      <div>
        <h3>Sem Vendedor</h3>
        <p>{withoutSeller}</p>
      </div>
    </div>
  );
}