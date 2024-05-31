import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-4xl">Home Page</h1>
      <SignedOut>
        <Link
          href={"/signin"}
          className="px-4 py-2 rounded bg-gray-800 cursor-pointer hover:brightness-110"
        >
          Go to Sign In Page
        </Link>
      </SignedOut>
    </div>
  );
}
