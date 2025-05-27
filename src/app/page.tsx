import HomePageActions from "@/components/HomePageActions";
import { logo_light_theme } from "@/constants/images";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Talk - Real Conversations",
  description: "Talk is more than just a chat app — it's where real conversations come to life.",
  openGraph: {
    title: "Talk - Real Conversations",
    description: "Experience chat like never before with Talk — fast, secure, and personal.",
    images: [
      {
        url: process.env.LOGO_PREVIEW_URL || "", // optional, place in /public or use full URL
        width: 1200,
        height: 630,
        alt: "Talk Chat App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk - Real Conversations",
    description: "Join Talk today and enjoy real-time secure messaging.",
    images: [process.env.LOGO_PREVIEW_URL || ""], // optional
  },
};

export default async function Home() {

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-y-5">
      <div className="relative w-[350px] h-[100px]">
        <Image src={logo_light_theme} alt="talk-logo" fill priority quality={100} style={{ objectFit: 'contain' }} sizes="350px" />
      </div>
      <p className="text-center text-sm font-medium text-gray-150">
        Talk is more than just a chat app <br /> it&apos;s where real conversations come to life.
      </p>
      <HomePageActions />
    </div>
  );
}
