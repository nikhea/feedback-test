"use client";
import { getPosts } from "@/app/actions/fetchPosts";
import { useQuery } from "@tanstack/react-query";

const CostItem = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["newposts"],
    queryFn: getPosts,
  });

  console.log({ data, isLoading });
  const newData = data[7];
  return (
    <div>
      <h1>{newData.title}</h1>
      <p>{newData.body}</p>
    </div>
  );
};

export default CostItem;
