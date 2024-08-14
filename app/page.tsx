'use client'
import Image from "next/image";
import HomeScreen from "./components/HomeScreen";
import { useQuery } from '@tanstack/react-query'



export default function Home() {

  return (
    <main>
     <HomeScreen/>
    </main>
  );
}
