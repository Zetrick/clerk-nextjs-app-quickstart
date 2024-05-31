import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email)
    return NextResponse.json({ error: "No email provided" }, { status: 400 });

  //Check to see if this user is in our system and is allowed to sign in
  //For the purpose of this minimal production, we'll say it is in our system and they are allowed to sign in

  const { totalCount } = await clerkClient.users.getUserList({
    externalId: [email],
  });

  //If they do not have a Clerk account, create a Clerk account for them
  if (totalCount === 0) {
    await clerkClient.users.createUser({
      firstName: email,
      lastName: email,
      emailAddress: [email],
      externalId: email,
    });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
