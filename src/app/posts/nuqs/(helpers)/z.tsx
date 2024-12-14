"use client";
import { useState, useMemo } from "react";
import { 
  useQueryStates, 
  parseAsBoolean, 
  parseAsString, 
  parseAsStringLiteral, 
  parseAsInteger 
} from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  dCheckInStatus, 
  kitCollectionStatus 
} from "./(helpers)/filter";

// Mock data type
interface UserData {
  id: string;
  uniqueId: string;
  email: string;
  d1CheckInStatus: string;
  d2CheckInStatus: string;
  kitCollectionStatus: string;
  isCheck: boolean;
}

// Mock data generator
const generateMockData = (count: number): UserData[] => 
  Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    uniqueId: `UN-${Math.random().toString(36).substr(2, 9)}`,
    email: `user${i + 1}@example.com`,
    d1CheckInStatus: dCheckInStatus[Math.floor(Math.random() * dCheckInStatus.length)],
    d2CheckInStatus: dCheckInStatus[Math.floor(Math.random() * dCheckInStatus.length)],
    kitCollectionStatus: kitCollectionStatus[Math.floor(Math.random() * kitCollectionStatus.length)],
    isCheck: Math.random() > 0.5
  }));

const UserManagement = () => {
  // Generate mock data
  const [users] = useState<UserData[]>(generateMockData(50));

  // Query state management
  const [filters, setFilters] = useQueryStates({
    limit: parseAsInteger.withDefault(10),
    page: parseAsString.withDefault('1'),
    uniqueId: parseAsString.withDefault(''),
    email: parseAsString.withDefault(''),
    d1CheckInStatus: parseAsStringLiteral(dCheckInStatus).withDefault(''),
    d2CheckInStatus: parseAsStringLiteral(dCheckInStatus).withDefault(''),
    kitCollectionStatus: parseAsStringLiteral(kitCollectionStatus).withDefault(''),
    isCheck: parseAsBoolean,
  });

  // Filter and pagination logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      (!filters.uniqueId || user.uniqueId.toLowerCase().includes(filters.uniqueId.toLowerCase())) &&
      (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.d1CheckInStatus || user.d1CheckInStatus === filters.d1CheckInStatus) &&
      (!filters.d2CheckInStatus || user.d2CheckInStatus === filters.d2CheckInStatus) &&
      (!filters.kitCollectionStatus || user.kitCollectionStatus === filters.kitCollectionStatus) &&
      (filters.isCheck === null || user.isCheck === filters.isCheck)
    );
  }, [users, filters]);

  // Pagination
  const page = parseInt(filters.page);
  const limit = filters.limit;
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      limit: 10,
      page: '1',
      uniqueId: '',
      email: '',
      d1CheckInStatus: '',
      d2CheckInStatus: '',
      kitCollectionStatus: '',
      isCheck: null
    });
  };

  // Render status select
  const renderStatusSelect = (
    id: string, 
    value: string, 
    statuses: readonly string[], 
    onChange: (status: string) => void
  ) => (
    <Select 
      value={value} 
      onValueChange={(status) => onChange(status)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${id}`} />
      </SelectTrigger>
      <SelectContent>
        {statuses.filter(Boolean).map((status) => (
          <SelectItem key={status} value={status}>
            {status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {/* Filters Column */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>

          <div className="space-y-2">
            <Input
              placeholder="UniqueId"
              value={filters.uniqueId}
              onChange={(e) => setFilters({ uniqueId: e.target.value })}
            />

            <Input
              placeholder="Email"
              value={filters.email}
              onChange={(e) => setFilters({ email: e.target.value })}
            />

            <div>
              <label className="block mb-2">D1 Check-In Status</label>
              {renderStatusSelect(
                "d1CheckInStatus", 
                filters.d1CheckInStatus, 
                dCheckInStatus, 
                (status) => setFilters({ d1CheckInStatus: status })
              )}
            </div>

            <div>
              <label className="block mb-2">D2 Check-In Status</label>
              {renderStatusSelect(
                "d2CheckInStatus", 
                filters.d2CheckInStatus, 
                dCheckInStatus, 
                (status) => setFilters({ d2CheckInStatus: status })
              )}
            </div>

            <div>
              <label className="block mb-2">Kit Collection Status</label>
              {renderStatusSelect(
                "kitCollectionStatus", 
                filters.kitCollectionStatus, 
                kitCollectionStatus, 
                (status) => setFilters({ kitCollectionStatus: status })
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCheck"
                checked={filters.isCheck || false}
                onCheckedChange={(checked) => setFilters({ isCheck: !!checked })}
              />
              <label htmlFor="isCheck">Check</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Column */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unique ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>D1 Check-In</TableHead>
                  <TableHead>D2 Check-In</TableHead>
                  <TableHead>Kit Collection</TableHead>
                  <TableHead>Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.uniqueId}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.d1CheckInStatus}</TableCell>
                    <TableCell>{user.d2CheckInStatus}</TableCell>
                    <TableCell>{user.kitCollectionStatus}</TableCell>
                    <TableCell>{user.isCheck ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div>
              Total Results: {filteredUsers.length}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setFilters({ page: (page - 1).toString() });
                    }} 
                  />
                </PaginationItem>
                {Array.from({ length: Math.ceil(filteredUsers.length / limit) }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setFilters({ page: (i + 1).toString() });
                      }}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < Math.ceil(filteredUsers.length / limit)) 
                        setFilters({ page: (page + 1).toString() });
                    }} 
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;



// <div className="mb-4">
// <label htmlFor="d2CheckInStatus" className="block mb-2">
//   Day2 Check-In Status
// </label>
// <select
//   id="d2CheckInStatus"
//   value={filters.d2CheckInStatus}
//   onChange={(e) =>
//     setFilters({
//       d2CheckInStatus: e.target
//         .value as (typeof dCheckInStatus)[number],
//     })
//   }
//   className=" p-2 border rounded"
// >
//   <option value="">Select Status</option>
//   {dCheckInStatus.map((status) => (
//     <option key={status} value={status}>
//       {status
//         .replace("-", " ")
//         .replace(/\b\w/g, (l) => l.toUpperCase())}
//     </option>
//   ))}
// </select>
// </div>

// <div className="mb-4">
// <label htmlFor="kitCollectionStatus" className="block mb-2">
//   kit Collection Status
// </label>
// <select
//   id="kitCollectionStatus"
//   value={filters.kitCollectionStatus}
//   onChange={(e) =>
//     setFilters({
//       kitCollectionStatus: e.target
//         .value as (typeof kitCollectionStatus)[number],
//     })
//   }
//   className=" p-2 border rounded"
// >
//   <option value="">Select Status</option>
//   {kitCollectionStatus.map((status) => (
//     <option key={status} value={status}>
//       {status
//         .replace("-", " ")
//         .replace(/\b\w/g, (l) => l.toUpperCase())}
//     </option>
//   ))}
// </select>
// </div>

// <div className="mb-4">
// <label htmlFor="d1CheckInStatus" className="block mb-2">
//   Day1 Check-In Status
// </label>
// <select
//   id="d1CheckInStatus"
//   value={filters.d1CheckInStatus}
//   onChange={(e) =>
//     setFilters({
//       d1CheckInStatus: e.target
//         .value as (typeof dCheckInStatus)[number],
//     })
//   }
//   className=" p-2 border rounded"
// >
//   <option value="">Select Status</option>
//   {dCheckInStatus.map((status) => (
//     <option key={status} value={status}>
//       {status
//         .replace("-", " ")
//         .replace(/\b\w/g, (l) => l.toUpperCase())}
//     </option>
//   ))}
// </select>
// </div>

// const handleSelectChange = (key: string, value: unknown) => {
//   console.log({
//     key,
//     value,
//   });

//   setFilters({ [key]: value });
// };
{
  /* {renderStatusSelect(
          "d1CheckInStatus",
          filters.d1CheckInStatus,
          dCheckInStatus,
          (status) =>
            setFilters({ d1CheckInStatus: status as DCheckInStatusType })
        )} */
}
// const renderStatusSelect = (
//   id: string,
//   value: string,
//   statuses: readonly string[],
//   onChange: (status: string) => void
// ) => (

//   <Select value={value} onValueChange={(status) => onChange(status)}>
//     <SelectTrigger className="w-full">
//       <SelectValue placeholder={`Select ${id}`} />
//     </SelectTrigger>
//     <SelectContent>
//       {statuses.filter(Boolean).map((status) => (
//         <SelectItem key={status} value={status}>
//           {status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//         </SelectItem>
//       ))}
//     </SelectContent>
//   </Select>
// );
