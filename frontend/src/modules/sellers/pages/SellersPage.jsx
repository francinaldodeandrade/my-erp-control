import PageContainer from "../../../layouts/PageContainer";
import PageHeader from "../../../layouts/PageHeader";


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
    <PageContainer>
      <PageHeader
        title="Vendedores"
      />

      <SellersTable
        sellers={sellers}
      />
    </PageContainer>
  );
}