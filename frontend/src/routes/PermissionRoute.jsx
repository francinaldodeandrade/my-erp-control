// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// export default function PermissionRoute({
//   permission,
//   children,
// }) {
//   const { user } = useAuth();

//   const permissions =
//     user?.role?.permissions || [];

//   const hasPermission =
//     permissions.includes(permission);

//   if (!hasPermission) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PermissionRoute({
  roles = [],
  children,
}) {
  const { user } = useAuth();

  const allowed =
    roles.includes(user?.role);

  if (!allowed) {
    return (
      <Navigate
        to="/unauthorized"
      />
    );
  }

  return children;
}