import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import { fetchAllData } from "@/utils/fetch";
// import Time from "@/components/Time";
import Timer from "@/components/Time";
import useTimer from "@/hooks/useTimer";
const inter = Inter({ subsets: ["latin"] });
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function Home() {
  const timeModal = useTimer();
  return (
    <main className={`h-screen`}>
      <Header />
      <div className={`flex flex-row`}>
        <Cards />
        <Timer isOpen={timeModal.isOpen} />
      </div>
    </main>
  );
}

// ("use client");
// import { Button, Grid, Stack } from "@mui/material";
// export default function Home() {
//   return (
//     <Grid
//       container
//       height="100vh"
//       alignItems="center"
//       justifyContent="center"
//       direction="column"
//     >
//       <h1 className=" text-blue-500">Using Material UI with Next.js 13</h1>
//       <Stack direction="row" columnGap={1}>
//         <Button variant="text">Text</Button>
//         <Button variant="contained">Contained</Button>
//         <Button variant="outlined">Outlined</Button>
//       </Stack>
//     </Grid>
//   );
// }
