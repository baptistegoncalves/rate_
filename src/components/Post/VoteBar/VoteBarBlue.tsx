import Image from "next/image";

export default function VoteBarBlue() {
  return (
    <>
      <section className="text-white m-4">
        {/* barre de vote Bleue */}
        <div className="bg-[#141417]/25 p-[4px] w-[50px] rounded-full">
          <div className="bg-[#ABC2FF] p-2 rounded-full my-3">
            <Image
              src="/smiley_etoiles_dans_les_yeux.png"
              className="m-auto"
              width={35}
              height={35}
              alt="smiley étoiles dans les yeux"
            />
          </div>
          <div className="bg-[#829BDD] p-2 rounded-full my-3">
            <Image
              src="/smiley_jaime_beacoup.png"
              className="m-auto"
              width={35}
              height={35}
              alt="smiley grand sourire"
            />
          </div>
          <div className="bg-[#6C81B6] p-2 rounded-full my-3">
            <Image
              src="/smiley_ok.png"
              className="m-auto"
              width={35}
              height={35}
              alt="smiley j'aime bien"
            />
          </div>
          <div className="bg-[#4C5A81] p-2 rounded-full my-3">
            <Image
              src="/smiley_pas_mon_style.png"
              className="m-auto"
              width={35}
              height={35}
              alt="smiley j'aime pas trop"
            />
          </div>
          <div className="bg-[#2C344B] p-2 rounded-full my-3">
            <Image
              src="/smiley_aime_pas_du_tout.png"
              className="m-auto"
              width={35}
              height={35}
              alt="smiley j'aime pas du tout"
            />
          </div>
        </div>
      </section>
    </>
  );
}
