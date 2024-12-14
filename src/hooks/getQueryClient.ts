import { QueryClient } from "@tanstack/react-query";

import { cache } from "react";

const options = {
  queries: {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // retry: false,
    // staleTime: 60 * 1000,
  },
};

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: options,
    })
);
