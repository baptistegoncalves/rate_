import React, { useState } from "react";
import Image from "next/image";

interface InfoEvent {
  marque: string;
  sousTitre: string;
  cheminImage: string;
}

const CardEvent = ({ marque, sousTitre, cheminImage }: InfoEvent) => {
  const cardStyle = {
    backgroundImage: `url(${cheminImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div className="h-[45px]"></div>
      <div
        className="text-white w-full h-[160px] min-w-[300px] p-4 rounded-[28px] transition-all hover:h-[400px]"
        style={cardStyle}
      >
        <div className="flex">
          <div className="w-auto relative">
            <h1 className="bg-black/10 backdrop-blur-sm ml-0 mr-auto p-1 rounded-[10px] text-lg font-bold">
              {marque}
            </h1>
          </div>

          <h2 className="bg-black/10 backdrop-blur-sm ml-auto mr-0 p-1 px-2 rounded-[10px] text-base font-bold">
            {sousTitre}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
