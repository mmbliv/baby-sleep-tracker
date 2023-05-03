import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback } from "react";
const Header = () => {
  const { data: currentUser } = useCurrentUser();
  const loginModel = useLoginModal();
  const onClick = useCallback(() => {
    loginModel.onOpen();
  }, [loginModel]);
  return (
    <div
      className={`h-1/4 bg-slate-500 border-4 flex flex-col items-center justify-center gap-3`}
    >
      {/* <p>Welcome</p> */}
      {/* <button onClick={onClick}>Login</button> */}
      <p>{currentUser ? currentUser.name : "welcome"}</p>
      <div>
        {currentUser ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={onClick}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Header;
