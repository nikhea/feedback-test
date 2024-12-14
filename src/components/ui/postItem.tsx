"use client";

import Link from "next/link";
import { getPosts, getPostSingle } from "../../app/actions/fetchPosts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useHoverTimeoutStore } from "@/store/fechHoverTimeoutStore";

const PostItem = () => {
  const queryClient = useQueryClient();
  const { onHoverEnter, onHoverLeave } = useHoverTimeoutStore();

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const prefetchPost = (id: string) => () => {
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
        <div
          key={idx}
          onMouseEnter={() =>
            onHoverEnter(post.id, prefetchPost(post.id), 2000)
          }
          onMouseLeave={() => onHoverLeave(post.id)}
        >
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

// const [hoverTimeouts, setHoverTimeouts] = useState<{
//   [key: string]: NodeJS.Timeout;
// }>({});

// const handleMouseEnter = (id: string) => {
//   // Set a timeout to prefetch after 10 seconds (10000 ms)
//   const timeoutId = setTimeout(() => prefetchPosts(id), 10000);
//   setHoverTimeouts((prev) => ({ ...prev, [id]: timeoutId }));
// };

// const handleMouseLeave = (id: string) => {
//   // Clear the timeout if the user stops hovering before 10 seconds
//   if (hoverTimeouts[id]) {
//     clearTimeout(hoverTimeouts[id]);
//     setHoverTimeouts((prev) => {
//       const updatedTimeouts = { ...prev };
//       delete updatedTimeouts[id];
//       return updatedTimeouts;
//     });
//   }
// };

//        // onMouseEnter={() => prefetchPosts(post.id)}
//        onMouseEnter={() => handleMouseEnter(post.id)}
//        onMouseLeave={() => handleMouseLeave(post.id)}
