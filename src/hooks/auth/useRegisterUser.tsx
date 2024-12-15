import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  signUpAction,
  ISignUpActionForm,
} from "@/app/actions/auth/sginUp.action";
export function useRegisterUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ISignUpActionForm) => signUpAction(data),
    onSuccess: async () => {
      router.push("/login");
      await queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
    },
    onError: async (user) => {
      console.log(`Error from useLoginUser Hook: ${user}`);
    },
  });
}
