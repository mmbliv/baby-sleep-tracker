import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import { fetchAllData } from "@/utils/fetch";
import Time from "@/components/Time";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`h-screen`}>
      <Header />
      <div className={`flex flex-row`}>
        <Cards />
        <Time />
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
