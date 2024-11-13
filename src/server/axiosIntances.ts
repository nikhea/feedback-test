import axios from "axios";
// import { getClerkToken, tokenResponse } from "../action/clerkToken";

const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: false,
});

// api.interceptors.request.use(
//   async (config: any) => {
//     try {
//       const tokenResponse: tokenResponse = await getClerkToken();

//       if (tokenResponse.status === 200 && tokenResponse.data) {
//         config.headers.Authorization = `Bearer ${tokenResponse.data}`;
//       } else {
//         console.error("Failed to retrieve Clerk token:", tokenResponse.message);
//       }
//     } catch (error) {
//       console.error("Error fetching Clerk token:", error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosBase;
