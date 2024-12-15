"use client";

import { useLogoutUser } from "@/hooks/auth/useLogOutUser";

const LogoutButton = () => {
  const logOutMutation = useLogoutUser();

  return (
    <button
      className="block"
      onClick={() => {
        if (!logOutMutation.isPending) {
          logOutMutation.mutate();
        }
      }}
      disabled={logOutMutation.isPending}
    >
      {logOutMutation.isPending ? "Logging out..." : "Log Out"}
    </button>
  );
};

export default LogoutButton;
