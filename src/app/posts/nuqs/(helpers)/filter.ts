const dCheckInStatus = [
  "",
  "checked-in",
  "not-checked-in",
  "checked-out",
] as const;

const kitCollectionStatus = ["", "not-collected", "collected"] as const;

const dCheckInStatusUI = [
  "checked-in",
  "not-checked-in",
  "checked-out",
] as const;

const kitCollectionStatusUI = ["not-collected", "collected"] as const;

type DCheckInStatusType = (typeof dCheckInStatusUI)[number];

type KitCollectionStatusType = (typeof kitCollectionStatusUI)[number];

interface RequestQuery {
  page: string;
  limit: number;
  email: string;
  name?: string;
  uniqueId: string;
  d1CheckInStatus: "" | "checked-in" | "not-checked-in" | "checked-out";
  d2CheckInStatus: "" | "checked-in" | "not-checked-in" | "checked-out";
  kitCollectionStatus: "" | "collected" | "not-collected";
  search: string;
  sortby?: string;
  fullName?: string;
  length?: number;
  isCheck?: boolean | null;
}

const defaultFilters: RequestQuery = {
  limit: 10,
  email: "",
  page: "1",
  uniqueId: "",
  name: "",
  search: "",
  sortby: "",
  fullName: "",
  length: 0,
  isCheck: null,
  d1CheckInStatus: "" as "" | "checked-in" | "not-checked-in" | "checked-out",
  d2CheckInStatus: "" as "" | "checked-in" | "not-checked-in" | "checked-out",
  kitCollectionStatus: "" as "" | "collected" | "not-collected",
};

export {
  dCheckInStatus,
  kitCollectionStatus,
  defaultFilters,
  dCheckInStatusUI,
  kitCollectionStatusUI,
};
export type { RequestQuery, DCheckInStatusType, KitCollectionStatusType };
