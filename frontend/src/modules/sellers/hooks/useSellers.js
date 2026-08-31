import { useQuery } from "@tanstack/react-query";

import { sellersApi } from "../../../api/sellers.api";

export default function useSellers() {
  return useQuery({
    queryKey: ["sellers"],

    queryFn: async () => {
      const response =
        await sellersApi.getAll();

      return response.data;
    },
  });
}