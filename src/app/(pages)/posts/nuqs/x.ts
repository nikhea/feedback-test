//   const [limit, setLimit] = useQueryState<RequestQuery['limit']>('limit');
//   const [name, setName] = useQueryState<RequestQuery['name']>('name');
//   const [uniqueId, setUniqueId] = useQueryState<RequestQuery['uniqueId']>('uniqueId');
//   const [d1CheckInStatus, setD1CheckInStatus] = useQueryState<RequestQuery['d1CheckInStatus']>('d1CheckInStatus');
//   const [d2CheckInStatus, setD2CheckInStatus] = useQueryState<RequestQuery['d2CheckInStatus']>('d2CheckInStatus');
//   const [kitCollectionStatus, setKitCollectionStatus] = useQueryState<RequestQuery['kitCollectionStatus']>('kitCollectionStatus');
//   const [sortby, setSortBy] = useQueryState<RequestQuery['sortby']>('sortby');
//   const [fullName, setFullName] = useQueryState<RequestQuery['fullName']>('fullName');
//   const [search, setSearch] = useQueryState<RequestQuery['search']>('search');
//   const [length, setLength] = useQueryState<RequestQuery['length']>('length');

{
  /* <button onClick={() => setLength(length ? length + 1 : 1)}>Increase Length</button>
        <p>Current Length: {length}</p> */
}
{
  /* <button onClick={() => setSearch('')} >Clear Search</button> */
}
{
  /* <input
          type="text"
          value={limit || ''}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Limit"
        /> */
}
{
  /* <input
          type="text"
          value={sortby || ''}
          onChange={(e) => setSortBy(e.target.value)}
          placeholder="Sort By"
        /> */
}

{
  /* <input
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        /> */
}

// function cleanObject(filiters: Values<{ limit: Omit<ParserBuilder<number>, "parseServerSide"> & { readonly defaultValue: number; parseServerSide(value: string | string[] | undefined): number; }; email: Omit<ParserBuilder<string>, "parseServerSide"> & { readonly defaultValue: string; parseServerSide(value: string | string[] | undefined): string; }; page: Omit<ParserBuilder<string>, "parseServerSide"> & { readonly defaultValue: string; parseServerSide(value: string | string[] | undefined): string; }; isCheck: ParserBuilder<boolean>; d1CheckInStatus: Omit<ParserBuilder<"" | "checked-in" | "not-checked-in" | "checked-out">, "parseServerSide"> & { readonly defaultValue: NonNullable<"" | "checked-in" | "not-checked-in" | "checked-out">; parseServerSide(value: string | string[] | undefined): NonNullable<"" | "checked-in" | "not-checked-in" | "checked-out">; }; uniqueId: Omit<ParserBuilder<string>, "parseServerSide"> & { readonly defaultValue: string; parseServerSide(value: string | string[] | undefined): string; }; }>): any {
//   throw new Error("Function not implemented.");
// }
//   const [email, setEmail] = useQueryState(
//     "email",
//     parseAsString.withDefault("")
//   );
//   const [page, setPage] = useQueryState("page", parseAsString.withDefault(""));

//   const [isCheck, setIsCheck] = useQueryState(
//     "isCheck",
//     parseAsBoolean.withDefault(false)
//   );
// const { email, page, isCheck, d1CheckInStatus } = filiters;

// const [filiters, setFiliters] = useQueryStates({
//   email: parseAsString.withDefault(""),
//   page: parseAsString.withDefault(""),
//   isCheck: parseAsBoolean.withDefault(false),
//   d1CheckInStatus: parseAsStringLiteral(sortOrder).withDefault(""),
// });
// const { email, page, isCheck, d1CheckInStatus } = filiters;

// const [filiters, setFiliters] = useQueryStates({
//   limit: parseAsInteger.withDefault(10),
//   email: parseAsString.withDefault(""),
//   page: parseAsString.withDefault(""),
//   isCheck: parseAsBoolean,
//   d1CheckInStatus: parseAsStringLiteral(sortOrder).withDefault(""),
//   uniqueId: parseAsString.withDefault(""),
// });
// const handlePage = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const newPage = parseInt(e.target.value);
//   const defaultFiltersPage = parseInt(defaultFilters.page);

//   if (isNaN(newPage) || newPage < defaultFiltersPage) {
//     return;
//   }

//   setFilters({ page: e.target.value });
// };
