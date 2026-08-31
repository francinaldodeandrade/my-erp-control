import { useQuery } from "@tanstack/react-query";

import { sellersApi } from "../../../api/sellers.api";

export default function useSellerCustomers(
  sellerId
) {
  return useQuery({
    queryKey: [
      "seller-customers",
      sellerId,
    ],

    queryFn: async () => {
      const response =
        await sellersApi.getCustomers(
          sellerId
        );

      return response.data;
    },

    enabled: !!sellerId,
  });
}