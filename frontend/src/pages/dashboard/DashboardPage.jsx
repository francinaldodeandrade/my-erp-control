import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    console.log("DASHBOARD CARREGOU");
  }, []);

  return (
    <h1>Dashboard</h1>
  );
}