export default function PageHeader({
  title,
  actions,
}) {
  return (
    <div className="page-header">
      <h1>{title}</h1>

      <div>
        {actions}
      </div>
    </div>
  );
}