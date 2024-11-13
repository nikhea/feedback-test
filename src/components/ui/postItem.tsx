"use client";
import Link from "next/link";

import { getPosts, getPostSingle } from "../../app/actions/fetchPosts";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PostItem = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const prefetchPosts = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["post", id],
      queryFn: () => getPostSingle(id),
      staleTime: 1000 * 60 * 3,
    });
  };
  if (isLoading) return "loading...";

  return (
    <div>
      {data?.map((post: { title: string; id: string }, idx: string) => (
        <div key={idx} onMouseEnter={() => prefetchPosts(post.id)}>
          <Link href={`/posts/${post.id}`} key={post.id}>
            {post.title}
          </Link>

          {post.title}
        </div>
      ))}
    </div>
  );
};

export default PostItem;
