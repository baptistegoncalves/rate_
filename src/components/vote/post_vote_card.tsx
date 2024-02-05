import Image from "next/image";
import { useState, useEffect } from "react";
import VoteBarGreen from "../Post/VoteBar/VoteBarGreen";
import VoteBarBlue from "../Post/VoteBar/VoteBarBlue";
import DescriptionFetch from "../Post/DescriptionFetch";
import DescriptionFetchBlue from "../Post/DescriptionFetchBlue";
import PostImage from "../Post/PostImage";
import { Commentaires } from "./Commentaires";

export function PostVoteCard({ commentaire1 = "commentaire", Nuance = true }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const width_ = screenWidth < 640 ? screenWidth : 390;
  const height_ = width_ * 1.6;

  return (
    <>
      <section>
        {" "}
        <div
          className="bg-[#212126] relative m-auto"
          style={{ width: `${width_}px`, height: `${height_}px` }}
        >
          <div className="absolute w-full top-2 z-20 m-4 sm:hidden">
            <Commentaires commentaire={commentaire1} />
          </div>
          <div className="m-auto">quoicou image du vote</div>
          <div className="absolute -right-20 -bottom-4 max-sm:right-0 max-sm:-bottom-2">
            {Nuance === true ? (
              <VoteBarGreen />
            ) : Nuance === false ? (
              <VoteBarBlue />
            ) : (
              <VoteBarGreen /> // par défaut
            )}
          </div>
          <div className="absolute left-0 bottom-0">
            {Nuance === true ? (
              <DescriptionFetch />
            ) : Nuance === false ? (
              <DescriptionFetchBlue />
            ) : (
              <DescriptionFetch /> // par défaut
            )}
          </div>
        </div>
        <div
          className="bg-white/20 w-full h-[2px] mt-12"
          style={{ minWidth: `${width_}px` }}
        ></div>
      </section>
    </>
  );
}
