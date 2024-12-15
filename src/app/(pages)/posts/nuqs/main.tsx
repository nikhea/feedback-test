"use client";
import { useMemo, useState } from "react";
import {
  useQueryStates,
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
  parseAsInteger,
} from "nuqs";
import { cleanObject } from "@/utils/cleanObject";
import {
  dCheckInStatus,
  defaultFilters,
  kitCollectionStatus,
  DCheckInStatusType,
  dCheckInStatusUI,
  kitCollectionStatusUI,
  RequestQuery,
  KitCollectionStatusType,
} from "./(helpers)/filter";

import SelectFilterComponent from "./(helpers)/selectFilterComponent";
import { useDebounce } from "react-use";

const MyComponent: React.FC = () => {
  const [filters, setFilters] = useQueryStates({
    limit: parseAsInteger.withDefault(defaultFilters.limit),
    page: parseAsString.withDefault(defaultFilters.page),
    search: parseAsString.withDefault(defaultFilters.search),
    uniqueId: parseAsString.withDefault(defaultFilters.uniqueId),
    email: parseAsString.withDefault(defaultFilters.email),
    d1CheckInStatus: parseAsStringLiteral(dCheckInStatus).withDefault(
      defaultFilters.d1CheckInStatus
    ),
    d2CheckInStatus: parseAsStringLiteral(dCheckInStatus).withDefault(
      defaultFilters.d2CheckInStatus
    ),
    kitCollectionStatus: parseAsStringLiteral(kitCollectionStatus).withDefault(
      defaultFilters.kitCollectionStatus
    ),
    isCheck: parseAsBoolean,
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const [isFilterReady, cancelFilterUpdate] = useDebounce(
    () => {
      setDebouncedFilters(filters);
    },
    500,
    [filters]
  );

  const cleanedFilters: Partial<RequestQuery> = useMemo(
    () => cleanObject(debouncedFilters),
    [debouncedFilters]
  );

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handlePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = e.target.value;
    const defaultFiltersPage = parseInt(defaultFilters.page);

    if (newPage === "") {
      setFilters({ page: newPage });
      return;
    }

    const parsedPage = parseInt(newPage);

    if (isNaN(parsedPage) || parsedPage < defaultFiltersPage) {
      return;
    }

    setFilters({ page: newPage });
  };

  console.log({
    cleanedFilters,
  });

  return (
    <div>
      <h1>Query Parameter Management: </h1>
      Filter State: {isFilterReady() ? "Ready" : "Pending"}
      <button onClick={cancelFilterUpdate}>Cancel Filter Update</button>
      <button onClick={resetFilters}>Reset Filters</button>
      <input
        type="text"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        placeholder="UniqueId, Name, Email"
      />
      <input
        type="number"
        value={filters.page}
        onChange={(e) => handlePage(e)}
        placeholder="Page"
      />
      <div className="flex gap-2 items-center  py-4 justify-evenly w-[50%] mx-auto">
        <div>
          <label className="block mb-2">D1 Check-In Status</label>
          <SelectFilterComponent
            id="d1 Check In Status"
            value={filters.d1CheckInStatus}
            statuses={dCheckInStatusUI}
            onChange={(status) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                d1CheckInStatus: status as DCheckInStatusType,
              }))
            }
          />
        </div>

        <div>
          <label className="block mb-2">D2 Check-In Status</label>
          <SelectFilterComponent
            id="d2 Check In Status"
            value={filters.d2CheckInStatus}
            statuses={dCheckInStatusUI}
            onChange={(status) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                d2CheckInStatus: status as DCheckInStatusType,
              }))
            }
          />
        </div>

        <div>
          <label className="block mb-2">Kit collection Status</label>
          <SelectFilterComponent
            id="Kit collection Status"
            value={filters.kitCollectionStatus}
            statuses={kitCollectionStatusUI}
            onChange={(status) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                kitCollectionStatus: status as KitCollectionStatusType,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MyComponent;

// const cleanedFilters: Partial<RequestQuery> = useMemo(
//   () => cleanObject(filters),
//   [filters]
// );

{
  /* <input
type="text"
value={filters.uniqueId}
onChange={(e) => setFilters({ uniqueId: e.target.value })}
placeholder="UniqueId"
/>

<input
type="text"
value={filters.email}
onChange={(e) => setFilters({ email: e.target.value })}
placeholder="Email"
/>

<label>
<input
  type="checkbox"
  checked={filters.isCheck || false}
  onChange={(e) => setFilters({ isCheck: e.target.checked })}
/>
Check
</label> */
}

// const cleanedFilters: Partial<RequestQuery> = useMemo(
//   () => cleanObject(filters),
//   [filters]
// );

{
  /* <input
  type="text"
  value={filters.uniqueId}
  onChange={(e) => setFilters({ uniqueId: e.target.value })}
  placeholder="UniqueId"
  />
  
  <input
  type="text"
  value={filters.email}
  onChange={(e) => setFilters({ email: e.target.value })}
  placeholder="Email"
  />
  
  <label>
  <input
    type="checkbox"
    checked={filters.isCheck || false}
    onChange={(e) => setFilters({ isCheck: e.target.checked })}
  />
  Check
  </label> */
}
