import { Link } from "react-router-dom";

export default function DashboardCard({
  title,
  value,
  description,
  color = "#2563eb",
  link,
}) {
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          borderLeft: `6px solid ${color}`,
          borderRadius: "12px",
          padding: "20px",
          width: "250px",
          background: "#fff",
          boxShadow:
            "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <h3>{title}</h3>

        <h1>{value}</h1>

        <p>{description}</p>
      </div>
    </Link>
  );
}