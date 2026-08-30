import { useQuery } from "@tanstack/react-query";

import { usersApi } from "../../../api/users.api";

export default function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response =
        await usersApi.getAll();

      return response.data;
    },
  });
}