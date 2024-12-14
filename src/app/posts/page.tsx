import React from "react";
import PostItem from "../../components/ui/postItem";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPosts } from "../actions/fetchPosts";
import Filiter from "./filiter";

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
