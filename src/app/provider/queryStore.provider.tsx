"use client";
import // useEffect,
// useState,
"react";
import {
  // QueryClient,
  QueryClientProvider,
  // focusManager,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "../../hooks/getQueryClient";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// useEffect(() => {
//   focusManager.setEventListener((handleFocus) => {
//     const focus = () => {
//       if (!document.hidden) {
//         console.log("Focus from parent");
//         handleFocus(true);
//         queryClient.refetchQueries();
//       }
//     };
//     window.addEventListener("visibilitychange", focus);
//     window.addEventListener("focus", focus);
//     return () => {
//       window.removeEventListener("visibilitychange", focus);
//       window.removeEventListener("focus", focus);
//     };
//   });
// });
// const [queryClient] = useState(() => new QueryClient());
