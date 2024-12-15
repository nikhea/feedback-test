"use client";

import { useGetUser } from "@/hooks/auth/useGetCurrentUser";

const AuthProvider = () => {
  useGetUser();

  return <></>;
};

export default AuthProvider;

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   useGetUser();

//   return <>{children}</>;
// };
// const [authToken, setAuthToken] = useState<string | null>(null);
// useEffect(() => {
//   const fetchToken = async () => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const token: any = await getAuthCookies();
//     setAuthToken(token);
//   };

//   fetchToken();
// }, [authToken, setAuthToken]);
// enabled: !!authToken,
// import { useEffect, useState } from "react";
// import { getAuthCookies } from "@/app/actions/auth/getAuthCookies.action";

// if (isLoading) return <div>Loading...</div>;
// if (isError) return <div>Error: {String(error)}</div>;

// const queryClient = useQueryClient();

// const { refetch } = useQuery({
//   queryKey: ["authenticated-user"],
//   queryFn: getCurrentUser,
//   staleTime: Infinity,
//   refetchIntervalInBackground: false,
//   refetchOnMount: false,
//   refetchOnWindowFocus: false,
//   refetchInterval: Infinity,
//   refetchOnReconnect: false,
//   retryOnMount: false,
//   retry: false,
// cacheTime: Infinity,
// });

// queryClient.getMutationCache().subscribe(() => {
//   refetch();
// });

// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../actions/auth/getCurrentUser.action";
// import { useQueryClient } from "@tanstack/react-query";
