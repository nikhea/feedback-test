"use client";
import { getCurrentUser } from "@/app/actions/auth/getCurrentUser.action";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const { data, isLoading, isError, isFetching, isSuccess } = useQuery({
    queryKey: ["authenticated-user"],
    queryFn: getCurrentUser,
    // enabled: !!authUser,
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnReconnect: false,
    retryOnMount: false,
  });

  return {
    user: data?.data,
    LoadingUser: isLoading,
    FetchingUser: isFetching,
    UserLoadSuccess: isSuccess,
    isError,
  };
}

// queryClient.getMutationCache().subscribe(() => {
//   refetch();
// });
