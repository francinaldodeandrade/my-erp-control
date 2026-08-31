import { Link } from "react-router-dom";

export default function SellersTable({
  sellers,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {sellers?.map((seller) => (
          <tr key={seller.id}>
            <td>{seller.name}</td>

            <td>{seller.email}</td>

            <td>
              {seller.active
                ? "🟢 Ativo"
                : "🔴 Inativo"}
            </td>

            <td>
              <Link
                to={`/sellers/${seller.id}`}
              >
                Detalhes
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}