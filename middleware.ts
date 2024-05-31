import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const authRequiredRoutes = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    // const roles = (auth().sessionClaims?.roles as number) || 0;
    if (authRequiredRoutes(req)) {
      auth().protect({ unauthenticatedUrl: req.nextUrl.origin + "/signin" });
    }
  },
  { debug: false }
);

//Applies next-auth only to the matching routes
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
