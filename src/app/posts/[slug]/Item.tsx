/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FC } from "react";
import { getPostSingle } from "../../../app/actions/fetchPosts";
import { useQuery } from "@tanstack/react-query";

const Item: FC<any> = (slugs) => {
  const { slug } = slugs;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", parseInt(slug)],
    queryFn: () =>
      slug && typeof slug === "string" ? getPostSingle(slug) : undefined,
    enabled: !!slug && typeof slug === "string",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading post</div>;

  console.log(data);
  return (
    <div>
      h1 postId
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
};

export default Item;
