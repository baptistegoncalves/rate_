"use client";

import Image from "next/image";
import PostLinks from "@/app/ui/post/PostLinks";
import Aperçu from "@/components/Post/Aperçu";
import DescriptionPost from "@/components/Post/DescriptionPost";
import PostImage from "@/components/Post/PostImage";
import VoteBarGreen from "@/components/Post/VoteBar/VoteBarGreen";
import VoteBarBlue from "@/components/Post/VoteBar/VoteBarBlue";

export default function Page() {
  return (
    <>
      <div className="text-white">
        <section>
          <div className="bg-zinc-900 absolute h-full w-full -z-50"></div>
          <Image
            src="/Rate-logo-background.svg"
            className="absolute inset-0 -z-50 opacity-5 overflow-hidden"
            objectFit="cover"
            layout="fill"
            alt="logo dans le fond de la page"
          />
          <div className="bg-zinc-900 absolute h-full w-full opacity-70 -z-10"></div>
        </section>
        <section className="flex">
          <div className="w-1/2">
            <Aperçu color="green" />
          </div>
          <div className="w-1/2 h-screen">
            <section className="p-4 flex w-[350px] m-auto">
              <PostLinks />
            </section>
            <section className="grid-col-2 h-4/5">
              <div className="grid grid-cols-2 h-2/3">
                <div className="flex flex-col justify-start">
                  <h2 className="text-center text-xl font-semibold mt-12">
                    1. Choisis ta photo
                  </h2>
                  <div className="flex mt-12">
                    <PostImage />
                  </div>
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="text-center text-xl font-semibold mt-12">
                    2. Choisis la couleur
                  </h2>
                  <div className="flex m-auto mt-12">
                    <VoteBarGreen />
                    <VoteBarBlue />
                  </div>
                </div>
              </div>

              <div className="h-1/3">
                <DescriptionPost />
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
