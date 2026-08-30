// src/modules/roles/hooks/useRoles.js

import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "../../../api/roles.api";

export default function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await rolesApi.getAll();

      console.log("ROLES:", response.data);

      return response.data;
    },
  });
}