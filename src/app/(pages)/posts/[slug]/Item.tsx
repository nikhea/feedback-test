/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getPostSingle } from "@/app/actions/fetchPosts";

const Item: FC<any> = ({ slug }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", parseInt(slug)],
    queryFn: () => getPostSingle(slug),
    enabled: !!slug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading post</div>;

  return (
    <div>
      <Link href="/posts"> go to post</Link>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
};

export default Item;
