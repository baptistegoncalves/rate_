import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";
import Link from "next/link";

export function Welcome() {
  const handle = () => {};

  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src="/Fond_d'ecran_login_page.jpg"
        layout="fill"
        objectFit="cover"
        alt="Fond d'écran de la page d'accueil"
      />
      <div className="absolute top-0 right-0 m-8 mt-8 mr-8 md:mr-32 z-20">
        <Image
          src="/Rate_logo.png"
          width={250}
          height={250}
          alt="Logo Rate"
          className="max-w-full h-auto"
        />
      </div>
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-black z-10">
        <div className="flex h-full items-center justify-center"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-end z-20 mt-36 ">
        <div className="w-full sm:w-full md:w-full lg:max-w-lg xl:max-w-lg p-4 md:p-12 mr-4 md:mr-6">
          <h2 className="text-2xl font-extrabold text-[#F7FDF2] text-center sm:text-center md:text-center lg:text-left xl:text-left">
            TU VEUX DES CONSEILS SUR TON STYLE VESTIMENTAIRE ?
          </h2>
          <h3 className="font-extralight text-[#F7FDF2] text-center mt-6 sm:text-center md:text-center lg:text-left xl:text-left">
            Alors télécharge l’app et lis les conseils des autres
          </h3>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center sm:justify-between md:justify-between lg:justify-between xl:justify-between mt-6">
            <Link href="">
              {/* {lien vers la doc de PAW} */}
              <Button className="w-full sm:w-full md:w-full lg:w-auto xl:w-auto mb-2 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 sm:mr-0 md:mr-0 lg:mr-2 xl:mr-2 bg-black border border-green-900 text-[#F7FDF2]">
                Télécharge l’app
              </Button>
            </Link>
            <Link href="/register">
              <Button className="w-full sm:w-full md:w-full lg:w-auto xl:w-auto bg-black border border-blue-950 text-[#F7FDF2]">
                Continuer sur le web
              </Button>
            </Link>
          </div>

          {/* Ajoutez le QRCode ici */}
          <div className="mt-12 ml-24 hidden md:block">
            <QRCode value="https://votre-lien-vers-le-QR-code" size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
