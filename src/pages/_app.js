import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
// import Modal from "@/components/Modal";
import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal";
export default function App({ Component, pageProps, session }) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
