import Image from "next/image";

export default function PostImage() {
  return (
    <>
      <section className="text-white m-auto my-3 p-4 w-1/3 rounded-[8px] bg-[#212126] hover:bg-[#2B2B31]">
          <Image
            src="/icon_image.svg"
            className="m-auto"
            width={35}
            height={35}
            alt="smiley grand sourire"
          />
      </section>
    </>
  );
}
