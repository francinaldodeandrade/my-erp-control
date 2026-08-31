import { useQuery } from "@tanstack/react-query";

import { customersApi }
from "../../../api/customers.api";

export default function useCustomers(
  filters
) {
  return useQuery({
    queryKey: [
      "customers",
      filters,
    ],

    queryFn: async () => {
      const response =
        await customersApi.getAll(
          filters
        );

      return response.data;
    },
  });
}