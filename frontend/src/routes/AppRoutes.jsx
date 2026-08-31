import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UsersPage from "../modules/users/pages/UsersPage";
import CreateUserPage from "../modules/users/pages/CreateUserPage";
import EditUserPage from "../modules/users/pages/EditUserPage";
import CustomersPage from "../modules/customers/pages/CustomersPage";
import CreateCustomerPage from "../modules/customers/pages/CreateCustomerPage";
import EditCustomerPage from "../modules/customers/pages/EditCustomerPage";
import AssignSellerPage from "../modules/customers/pages/AssignSellerPage";
import PlaceholderPage from "../pages/PlaceholderPage";
import SellersPage from "../modules/sellers/pages/SellersPage";
import SellerDetailsPage from "../modules/sellers/pages/SellerDetailsPage";




import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute>

              <MainLayout>
                <DashboardPage />
              </MainLayout>

            </PrivateRoute>
          }
        />
        <Route
  path="/users"
  element={
    <PrivateRoute>
      <MainLayout>
        <UsersPage />
      </MainLayout>
    </PrivateRoute>
  }
/>
<Route
  path="/users/new"
  element={
    <PrivateRoute>
      <MainLayout>
        <CreateUserPage />
      </MainLayout>
    </PrivateRoute>
  }
/>
<Route
  path="/users/:id/edit"
  element={
    <PrivateRoute>
      <MainLayout>
        <EditUserPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/customers"
  element={
    <PrivateRoute>
      <MainLayout>
        <CustomersPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/customers/new"
  element={
    <PrivateRoute>
      <MainLayout>
        <CreateCustomerPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/customers/:id/edit"
  element={
    <PrivateRoute>
      <MainLayout>
        <EditCustomerPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/customers/:id/assign-seller"
  element={
    <PrivateRoute>
      <MainLayout>
        <AssignSellerPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/suppliers"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Fornecedores"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/purchases"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Compras"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/sales"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Vendas"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/financial"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Financeiro"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/raw-materials"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Matérias-Primas"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/formulas"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Fórmulas"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/finished-products"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Produtos Acabados"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/production"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Produção"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/distributions"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Distribuição de Estoque"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/notifications"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Notificações"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/roles"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Perfis e Permissões"
        />
      </MainLayout>
    </PrivateRoute>
  }
/>

{/* <Route
  path="/sellers"
  element={
    <PrivateRoute>
      <MainLayout>
        <PlaceholderPage
          title="Vendas"
        />
      </MainLayout>
    </PrivateRoute>
  }
/> */}

<Route
  path="/sellers"
  element={
    <PrivateRoute>
      <MainLayout>
        <SellersPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/sellers/:id"
  element={
    <PrivateRoute>
      <MainLayout>
        <SellerDetailsPage />
      </MainLayout>
    </PrivateRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}