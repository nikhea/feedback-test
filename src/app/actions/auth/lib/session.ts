import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);

const COOKIE_NAME = "auth_token";
const JWT_EXPIRATION = "1h";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 3600,
  path: "/",
};

interface SessionPayload {
  userId: string;
}

export async function createSession(userId: string): Promise<void> {
  const token = await encrypt({ userId });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);
  redirect("/");
}

export async function verifySession(): Promise<string | null | unknown> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return null;
  }

  try {
    const session = await decrypt(token.value);

    const userId = session?.user;

    if (userId) redirect("/login");

    return userId;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
}

async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET_BUFFER);
}

async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET_BUFFER, {
    algorithms: ["HS256"],
  });
  return payload;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// async function encrypt(payload: any): Promise<string> {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(JWT_EXPIRATION)
//     .sign(JWT_SECRET_BUFFER);
// }

// async function decrypt(token: string) {
//   const { payload } = await jwtVerify(token, JWT_SECRET_BUFFER, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }

// interface SessionPayload {
//   userId: string;
// }

// import "server only";
// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const JWT_SECRET = process.env.JWT_SECRET!;
// const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);

// const cookie = {
//   name: "auth_token",
//   duration: 24 * 60 * 1000,
//   Option: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 3600,
//     path: "/",
//   },
// };
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function encrypt(payload: any) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("1h")
//     .sign(JWT_SECRET_BUFFER);
// }

// export async function decrypt(session: string) {
//   try {
//     const { payload } = await jwtVerify(session, JWT_SECRET_BUFFER, {
//       algorithms: ["HS256"],
//     });

//     return payload;
//   } catch (error: unknown) {
//     console.log({
//       message: `error decrypting session`,
//       error,
//     });

//     return null;
//   }
// }
// export async function createSession(userId: string) {
//   //   const expires = new Date(Date.now() + cookie.duration);
//   const cookieStore = await cookies();

//   const token = await encrypt({ userId });
//   cookieStore.set(cookie.name, token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 3600,
//     path: "/",
//   });

//   redirect("/");
// }

// export async function verifySession(tokenValue: string) {
//   const session = await decrypt(tokenValue);

//   const userId = session?.user;

//   if (userId) redirect("/login");

//   return userId;
// }

// export async function deleteSession() {
//   const cookieStore = await cookies();
//   cookieStore.delete(cookie.name);
//   redirect("/login");
// }
