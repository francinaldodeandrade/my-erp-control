import useSellers from "../hooks/useSellers";

import SellersTable from "../components/SellersTable";

export default function SellersPage() {
  const {
    data,
    isLoading,
  } = useSellers();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const sellers =
    data?.data || [];

  return (
    <div>
      <h1>Vendedores</h1>

      <SellersTable
        sellers={sellers}
      />
    </div>
  );
}