import Image from "next/image";

export function Commentaires({ commentaire = "commentaire" }) {
  return (
    <>
      <section className="bg-white rounded-[20px] text-black w-4/5 my-4 p-2 px-8 max-sm:bg-white/50 max-sm:my-0">
        <p>{commentaire}</p>
      </section>
    </>
  );
}
