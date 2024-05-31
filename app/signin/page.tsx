"use client";

import { useSignIn, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [redirectURL, setRedirectURL] = useState("");
  const { signIn } = useSignIn();

  useEffect(() => {
    //Format the redirect URL to go to the dashboard
    //This useEffect will replace the /signin path with /dashboard
    const url = new URL(window.location.href);
    const path = url.pathname;
    const newPath = path.replace(/signin.*/, "dashboard");
    const newFullURL = `${url.origin}${newPath}`;
    console.log("Setting redirect URL to:", newFullURL);

    setRedirectURL(newFullURL);
  }, []);

  async function submit(e: any) {
    e.preventDefault();

    //Check to see that this email is an hRes in our system

    setSendingEmail(true);
    //Call our endpoint to check if this email is an hRes and if they have a Clerk account
    //If they are an HRes but don't have a Clerk account, we'll create one for them
    console.log("fetching");

    const result = await fetch(
      `/signin/emailCheck/?email=${encodeURIComponent(email)}`
    );

    console.log("result: ", result);

    //Attempt sign in
    await signIn!
      .create({
        identifier: email,
        strategy: "email_link",
        redirectUrl: redirectURL,
      })
      .then((result) => {
        setSendingEmail(false);
        setEmailSent(true);
      })
      .catch((err) => {
        setSendingEmail(false);
        setEmailSent(true);
        console.error("error", err.errors[0].longMessage);
      });
  }

  return (
    <div className=" flex flex-col items-center">
      {sendingEmail && (
        <div className="">
          <p>Sending Email...</p>
        </div>
      )}
      {!sendingEmail && emailSent && (
        <div className="flex max-w-md grow flex-col justify-center p-4 space-y-4">
          <h1 className=" text-center text-4xl">Done</h1>
          <p className="text-center leading-tight">
            Please check your email for a sign in link.
          </p>
        </div>
      )}
      {!sendingEmail && !emailSent && (
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-4xl">Sign In</h1>
          <form
            className="space-y-6 flex flex-col items-center"
            onSubmit={submit}
          >
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className=" block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none min-w-48 text-slate-800"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />

            <input
              type="submit"
              className="px-4 py-2 rounded bg-gray-800 cursor-pointer hover:brightness-110 min-w-72"
              value={"Send Verification Link"}
            />
          </form>
        </div>
      )}
    </div>
  );
}
