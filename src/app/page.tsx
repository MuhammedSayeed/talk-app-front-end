import HomePageActions from "@/components/HomePageActions";
import { logo_light_theme } from "@/constants/images";
import Image from "next/image";

export default async function Home() {

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-y-5">
      <div className="relative w-[350px] h-[100px]">
        <Image src={logo_light_theme} alt="talk-logo" fill priority quality={100} style={{   objectFit: 'contain' }} sizes="350px"/>
      </div>
      <p className="text-center text-sm font-medium text-gray-150">
        Talk is more than just a chat app <br /> it&apos;s where real conversations come to life.
      </p>
      <HomePageActions />
    </div>
  );
}
