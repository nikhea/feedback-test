import React, { createContext, useContext, useRef, useCallback } from "react";

type MutationContextType = {
  incrementPending: () => void;
  decrementPending: () => void;
  getPendingCount: () => number;
};

const MutationContext = createContext<MutationContextType | undefined>(
  undefined
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const MutationProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const pendingMutation = useRef(0);

  const incrementPending = useCallback(() => {
    pendingMutation.current += 1;
    console.log("Incremented: pending mutation", pendingMutation.current);
  }, []);

  const decrementPending = useCallback(() => {
    pendingMutation.current -= 1;
    console.log("DEcremented: pending mutation", pendingMutation.current);
  }, []);

  const getPendingCount = useCallback(() => pendingMutation.current, []);
  return (
    <MutationContext.Provider
      value={{ incrementPending, decrementPending, getPendingCount }}
    >
      {children}
    </MutationContext.Provider>
  );
};

export const useMutationContext = () => {
  const context = useContext(MutationContext);

  if (context === undefined) {
    throw new Error(`useMutationContext must be within a mutationProvider`);
  }

  return context;
};
