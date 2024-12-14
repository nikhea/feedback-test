/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import { useQueryStates } from "nuqs";
import { cleanObject } from "@/utils/cleanObject";

import { useDebounce } from "react-use";

interface UseQueryFiltersProps<T> {
  defaultFilters: T;
  parsers: { [K in keyof T]: any };
  timeout?: number;
}

type Nullable<T> = { [K in keyof T]: T[K] | null };

export const useQueryFilters = <T extends Record<string, any>>({
  defaultFilters,
  parsers,
  timeout = 5000,
}: UseQueryFiltersProps<T>) => {
  const [filters, setFiltersRaw] = useQueryStates(
    Object.entries(parsers).reduce(
      (acc, [key, parser]) => ({
        ...acc,
        [key]: parser.withDefault(defaultFilters[key]),
      }),
      {} as Record<keyof T, any>
    )
  );

  const setFilters: React.Dispatch<React.SetStateAction<Partial<Nullable<T>>>> =
    setFiltersRaw;

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const [isFilterReady, cancelFilterUpdate] = useDebounce(
    () => {
      setDebouncedFilters(filters);
    },
    timeout,
    [filters]
  );

  const cleanedFilters = useMemo(
    () => cleanObject(debouncedFilters),
    [debouncedFilters]
  );

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handlePage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPage = e.target.value;
      const defaultFiltersPage = parseInt(defaultFilters.page);

      if (newPage === "") {
        setFilters((prev) => ({ ...prev, page: newPage }));

        return;
      }

      const parsedPage = parseInt(newPage);

      if (isNaN(parsedPage) || parsedPage < defaultFiltersPage) {
        return;
      }
      setFilters((prev) => ({ ...prev, page: newPage }));
    },
    [defaultFilters.page, setFilters]
  );

  return {
    filters,
    setFilters,
    debouncedFilters,
    isFilterReady,
    cancelFilterUpdate,
    cleanedFilters,
    resetFilters,
    handlePage,
  };
};
