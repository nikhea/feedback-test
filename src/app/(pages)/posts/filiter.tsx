"use client";
import { useMemo } from "react";
import {
  useQueryStates,
  parseAsBoolean,
  parseAsString,
  //   parseAsStringLiteral,
  parseAsInteger,
} from "nuqs";
import { cleanObject } from "@/utils/cleanObject";

const Filiter = () => {
  const [filters] = useQueryStates({
    count: parseAsInteger,
    hello: parseAsString,
    isUsed: parseAsBoolean,
  });

  const cleanedFilters = useMemo(() => cleanObject(filters), [filters]);

  console.log(cleanedFilters);

  return <div>Filiter</div>;
};

export default Filiter;

// page: parseAsString.withDefault(defaultFilters.page),
// isCheck: parseAsBoolean,
// d1CheckInStatus: parseAsStringLiteral(sortOrder).withDefault(""),
// uniqueId: parseAsString.withDefault(defaultFilters.uniqueId),
