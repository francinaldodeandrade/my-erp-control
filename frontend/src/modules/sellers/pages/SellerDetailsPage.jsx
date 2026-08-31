import { useParams } from "react-router-dom";

import useSellerCustomers from "../hooks/useSellerCustomers";
import useSellerDashboard from "../hooks/useSellerDashboard";
import useSellers from "../hooks/useSellers";

export default function SellerDetailsPage() {
  const { id } = useParams();

  const { data: sellersData } =
    useSellers();

  const {
    data: customersData,
  } = useSellerCustomers(id);

  const {
    data: dashboardData,
  } = useSellerDashboard(id);

  const sellers =
    sellersData?.data || [];

  const seller = sellers.find(
    (item) => item.id === id
  );

  const customers =
    customersData?.data || [];

  const dashboard =
    dashboardData?.data;

  return (
    <div>
      <h1>
        {seller?.name}
      </h1>

      <p>
        {seller?.email}
      </p>

      <hr />

      <h2>Indicadores</h2>

      <p>
        Clientes:
        {" "}
        {dashboard?.customers || 0}
      </p>

      <p>
        Vendas:
        {" "}
        {dashboard?.sales || 0}
      </p>

      <p>
        Distribuições:
        {" "}
        {dashboard?.distributions || 0}
      </p>

      <p>
        Faturamento:
        {" "}
        R$ {dashboard?.salesAmount || 0}
      </p>

      <hr />

      <h2>
        Clientes Vinculados
      </h2>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(
            (customer) => (
              <tr key={customer.id}>
                <td>
                  {customer.name}
                </td>

                <td>
                  {customer.city}
                </td>

                <td>
                  {customer.active
                    ? "🟢 Ativo"
                    : "🔴 Inativo"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}