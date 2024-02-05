"use client";
import Image from "next/image";
import VoteDisplay from "@/components/vote/VoteDisplay";

export default function Page() {
  const backgroundImageUrl = "/bg-rate.png";

  return (
    <>
      <section
        className="text-white bg-fixed"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <VoteDisplay />
      </section>
    </>
  );
}
