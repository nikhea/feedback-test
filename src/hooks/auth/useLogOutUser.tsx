import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth/logOut.action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// import { redirect } from "next/navigation";

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => logoutAction(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
      // redirect("/login");
      router.push("/login");
      router.refresh();
    },
    onError: async (error) => {
      console.log(`Error from useLoginOut Hook: ${error}`);
    },
  });
}
