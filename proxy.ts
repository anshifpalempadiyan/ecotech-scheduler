import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Logic here runs only if the user is authenticated
    return NextResponse.next();
  },
  {
    // Pass the secret directly to ensure the middleware can read the cookie
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = { 
  // List only the routes you want to protect. 
  // Do NOT include "/auth/signin" here or it will loop.
  matcher: [
    "/dashboard/:path*", 
    "/availability/:path*",
    "/settings/:path*"
  ] 
};