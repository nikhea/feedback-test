"use client";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
  parseAsInteger,
} from "nuqs";
import {
  dCheckInStatus,
  defaultFilters,
  kitCollectionStatus,
  DCheckInStatusType,
  dCheckInStatusUI,
  kitCollectionStatusUI,
  KitCollectionStatusType,
  RequestQuery,
} from "./(helpers)/filter";

import SelectFilterComponent from "./(helpers)/selectFilterComponent";
import { useQueryFilters } from "@/hooks/use-queryFiliter";

const parsers = {
  limit: parseAsInteger,
  page: parseAsString,
  search: parseAsString,
  uniqueId: parseAsString,
  email: parseAsString,
  d1CheckInStatus: parseAsStringLiteral(dCheckInStatus),
  d2CheckInStatus: parseAsStringLiteral(dCheckInStatus),
  kitCollectionStatus: parseAsStringLiteral(kitCollectionStatus),
  sortby: parseAsString,
  fullName: parseAsString,
  length: parseAsInteger,
  isCheck: parseAsBoolean,
};

const MyComponent: React.FC = () => {
  const {
    filters,
    setFilters,
    cleanedFilters,
    resetFilters,
    handlePage,
    isFilterReady,
    cancelFilterUpdate,
  } = useQueryFilters<RequestQuery>({
    defaultFilters,
    parsers,
    timeout: 2500,
  });

  console.log({
    cleanedFilters,
  });

  return (
    <div>
      <h1>Query Parameter Management: </h1>
      <br />
      depon{cleanedFilters.search}
      <br />
      <br />
      fil{filters.search}
      <br />
      <br />
      Filter State: {isFilterReady() ? "Ready" : "Pending"}
      <br />
      <br />
      <button onClick={cancelFilterUpdate}>Cancel Filter Update</button>
      <br />
      <br />
      <button onClick={resetFilters}>Reset Filters</button>
      <br />
      <br />
      <input
        type="text"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        placeholder="UniqueId, Name, Email"
        className="border-2 p-2 border-yellow-500"
      />
      <br />
      <br />
      <input
        type="number"
        value={filters.page}
        onChange={(e) => handlePage(e)}
        placeholder="Page"
        className="border-2 p-2 border-yellow-500"
      />
      <br />
      <br />
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
