"use client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../actions/auth/getUser.action";
import { useQueryClient } from "@tanstack/react-query";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { refetch } = useQuery({
    queryKey: ["authenticated-user"],
    queryFn: getCurrentUser,
  });

  queryClient.getMutationCache().subscribe(() => {
    refetch();
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {String(error)}</div>;

  return <>{children}</>;
};

export default AuthProvider;

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
