import { loginAction, ILogInActionForm } from "@/app/actions/auth/LogIn.action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
// import { redirect } from "next/navigation";

export function useLoginUser() {
  const [name] = useQueryState("from");
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ILogInActionForm) => loginAction(data),
    onSuccess: async () => {
      const redirectTo = name || "/dashboard";
      router.refresh();
      // redirect(redirectTo);
      router.push(redirectTo);
      await queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
    },
    onError: async (user) => {
      console.log(`Error from useLoginUser Hook: ${user}`);
    },
  });
}

// queryClient.setQueryData(["authenticated-user"], user);
