import { useQuery } from "@tanstack/react-query";

import { sellersApi } from "../../../api/sellers.api";

export default function useSellerDashboard(
  sellerId
) {
  return useQuery({
    queryKey: [
      "seller-dashboard",
      sellerId,
    ],

    queryFn: async () => {
      const response =
        await sellersApi.getDashboard(
          sellerId
        );

      return response.data;
    },

    enabled: !!sellerId,
  });
}