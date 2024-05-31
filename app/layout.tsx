import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="flex justify-center">
            <SignedIn>
              <div className="w-full flex relative mb-4">
                <p className="bg-green-800 w-full text-center font-extrabold tracking-widest select-none py-4">
                  You are signed in!
                </p>
                <div className=" flex justify-center items-center bg-green-600 tracking-wider w-32 absolute right-0 md:h-full font-bold ">
                  <SignOutButton />
                </div>
                <Link
                  className=" flex justify-center items-center bg-green-700 tracking-wider w-32 absolute right-32 h-full font-bold"
                  href={"/dashboard"}
                >
                  Dashboard
                </Link>
              </div>
            </SignedIn>
            <SignedOut>
              <p className="bg-red-800 w-full text-center mb-4 p-4 font-extrabold tracking-widest select-none">
                You are signed out
              </p>
            </SignedOut>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
