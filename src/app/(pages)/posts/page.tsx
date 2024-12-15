import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Filiter from "./filiter";
import { getPosts } from "@/app/actions/fetchPosts";
import PostItem from "@/components/ui/postItem";

const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Filiter />
      <PostItem />
    </HydrationBoundary>
  );
};

export default Page;
