// import { wait } from "@/utils/wait.util";
// import React from "react";

// async function Cost() {
//   await wait(5000);
//   return <div>Cost</div>;
// }

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getPosts } from "@/app/actions/fetchPosts";
import CostItem from "./CostItem";

async function Cost() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["newposts"],
    queryFn: getPosts,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CostItem />
    </HydrationBoundary>
  );
}

export default Cost;

// const Cost = async () => {

//   return <div>Cost</div>;
// };
