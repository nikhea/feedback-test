"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// const [queryClient] = useState(() => new QueryClient());
// focusManager

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
