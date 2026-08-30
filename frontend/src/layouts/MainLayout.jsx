import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
  children,
}) {
  return (
    <div className="app">

      <Sidebar />

      <div className="content">

        <Header />

        <main>
          {children}
        </main>

      </div>

    </div>
  );
}