import axiosBase from "@/server/axiosIntances";

export async function getPosts() {
  try {
    const posts = await axiosBase.get("/posts");
    return posts.data || [];
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function getPostSingle(id: string) {
  try {
    const posts = await axiosBase.get(`/posts/${id}`);
    return posts.data;
  } catch (error: unknown) {
    console.error(error);
  }
}

// const posts = await fetch(
//   "posts"
// ).then((response) => response.json());

// console.log("checking", posts);
