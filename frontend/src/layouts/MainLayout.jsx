/* Sem Props */

// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function MainLayout({
//   children,
// }) {
//   return (
//     <div className="app">
//       <Sidebar />

//       <div className="content">
//         <Header />

//         <main className="main-content">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

/* Com props */

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="app">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {sidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() =>
      setSidebarOpen(false)
    }
  />
)}

      <div className="content">
        <Header
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}