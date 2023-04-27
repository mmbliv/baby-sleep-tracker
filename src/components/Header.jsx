import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
const Header = () => {
  const { data: session } = useSession();
  return (
    <div
      className={`h-1/4 bg-slate-500 border-4 flex flex-col items-center justify-center gap-3`}
    >
      <p>{session ? session.user.name : "welcome"}</p>
      <div>
        {session ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Header;
