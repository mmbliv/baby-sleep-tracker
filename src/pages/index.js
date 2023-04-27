import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { FaBabyCarriage } from "react-icons/fa";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      className={`h-screen`}
    >
      <Header />
      <div className={`flex items-center justify-center`}>
        <Card icon={FaBabyCarriage} />
      </div>
    </main>
  );
}
