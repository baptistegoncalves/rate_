import VoteBarBlue from "./VoteBar/VoteBarBlue";
import VoteBarGreen from "./VoteBar/VoteBarGreen";
import DescriptionFetch from "@/components/Post/DescriptionFetch"

const width_ = 360;
const height_ = width_ * 1.777777778;

export default function Aperçu({ color = "null" }) {
  return (
    <>
      <section
        className="text-white flex items-center justify-end mr-10"
        style={{ height: "100vh" }}
      >
        <div className="m-auto mr-0">
          <p>Aperçu :</p>
          <div
            className="text-white bg-[#212126] rounded-[13px] relative"
            style={{ width: `${width_}px`, height: `${height_}px` }}
          >
            <div className="absolute right-0 bottom-0 scale-[0.9]">
              {color === "green" ? (
                <VoteBarGreen />
              ) : color === "blue" ? (
                <VoteBarBlue />
              ) : (
                <VoteBarGreen /> // par défaut
              )}
            </div>
            <div className="absolute left-0 bottom-0">
              <DescriptionFetch/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
