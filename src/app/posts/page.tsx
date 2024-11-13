import React from "react";
import PostItem from "../../components/ui/postItem";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosts } from "../actions/fetchPosts";
import { getQueryClient } from "../../hooks/getQueryClient";

const page = async () => {
  // const queryClient = new QueryClient();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostItem />
    </HydrationBoundary>
  );
};

export default page;
