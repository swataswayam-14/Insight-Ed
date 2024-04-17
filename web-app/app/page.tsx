"use client"
import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./components/NavBar";
import Banner from "./components/Banner";
import LearningSections from "./components/Section";
import PremiumLearning from "./components/PremiumLearning";
export default function Home() {
  const Router = useRouter();
  return (
    <div>
      <Navbar/>
      <Banner/>
      <LearningSections/>
      <PremiumLearning/>
    </div>
  );
}



{/* <Image 
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-60 rounded-xl" 
        src="/Main.png"
        alt="Next.js Logo" 
        width={780} 
        height={350} 
        priority 
      /> */}