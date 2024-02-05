import Image from "next/image";
import CardEvent from "@/components/Event/CardEvent";

export default function Page() {
  return (
    <>
      <section>
        <div className="bg-zinc-900 absolute h-full w-full -z-50"></div>
        <Image
          src="/Rate-logo-background.svg"
          className="absolute inset-0 -z-50 opacity-5 overflow-hidden"
          objectFit="cover"
          layout="fill"
          alt="logo dans le fond de la page"
        />
        <div className="bg-zinc-900 absolute h-full w-full opacity-70 -z-40"></div>
      </section>
      <section className="w-full max-[500px]:p-4">
        <div className="w-2/6 m-auto max-[1100px]:w-4/6 max-[500px]:w-full">
          <CardEvent
            marque="Nike"
            sousTitre="RedEvent"
            cheminImage="/nike_event.png"
          />
        </div>
        <div className="w-2/6 m-auto max-[1100px]:w-4/6 max-[500px]:w-full">
          <CardEvent
            marque="Balenciaga"
            sousTitre="Musiciaga"
            cheminImage="/balenciaga_event.png"
          />
        </div>
        <div className="w-2/6 m-auto max-[1100px]:w-4/6 max-[500px]:w-full">
          <CardEvent
            marque="Salomon"
            sousTitre="Dans la montagne"
            cheminImage="/salomon_event.png"
          />
        </div>
      </section>
    </>
  );
}
