import ReactDOM from "react-dom/client";

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./contexts/AuthProvider";

import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </QueryClientProvider>
);