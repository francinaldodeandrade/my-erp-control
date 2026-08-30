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

      </Routes>

    </BrowserRouter>
  );
}