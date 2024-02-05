import Image from "next/image";

export function PlusButton() {
  return (
    <>
        <section className="bg-[#1F1F24] w-[50px] h-[50px] rounded-full flex cursor-pointer">
          <Image
            src="/cross_icon.svg"
            width={30}
            height={30}
            className="m-auto rotate-45"
            alt="icon plus pour le bouton de post"
          />
        </section>
    </>
  );
}
