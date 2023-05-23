import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
// import Modal from "@/components/Modal";
import { Toaster } from "react-hot-toast";
import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
