import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Cards from "@/components/Cards";
import Timer from "@/components/Time";
import useTimer from "@/hooks/useTimer";
const inter = Inter({ subsets: ["latin"] });
import Data from "@/components/Data";
// import { useSession } from "next-auth/react";

export default function Home() {
  // const { data: currentUser, error } = useCurrentUser();
  // const { data } = useSession();
  const timeModal = useTimer();
  return (
    <main className={`h-screen`}>
      <Header />
      <div className="flex flex-row w-full">
        <Cards />
        <Timer isOpen={timeModal.isOpen} />
        <Data isOpen={timeModal.isOpen} />
      </div>
    </main>
  );
}
