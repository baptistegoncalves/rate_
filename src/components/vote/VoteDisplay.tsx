import Image from "next/image";
import Link from "next/link";
import { PostVoteCard } from "@/components/vote/post_vote_card";
import { PlusButton } from "./PlusButton";
import { Commentaires } from "./Commentaires";

const commentaire1 =
  "Waouh, cette tenue est absolument magnifique ! Les couleurs s'harmonisent parfaitement, et chaque détail est pensé avec soin. Tu as un sens du style incroyable ! 😍";
const commentaire2 =
  "J'aime beaucoup ton style ! D'où vient cette pièce unique que tu portes ? Je cherche quelque chose de similaire depuis des lustres ! 😊";
const commentaire3 =
  "J'aime bien cette tenue. Simple et élégante. Ça donne une impression de sophistication décontractée. Classe ! 👌";
const Nuance = true;

export default function VoteDisplay() {
  return (
    <>
      <section>
        <div className="flex">
          <div className="w-1/3 max-sm:hidden pt-12">
            <Commentaires commentaire={commentaire1} />
            <Commentaires commentaire={commentaire2} />
            <Commentaires commentaire={commentaire3} />
          </div>
          <div className="w-1/3 ml-0 my-auto pt-12 max-sm:w-full">
            <PostVoteCard commentaire1="commentaire1" Nuance={Nuance} />
          </div>
        </div><div className="flex">
          <div className="w-1/3 max-sm:hidden pt-12">
            <Commentaires commentaire={commentaire1} />
            <Commentaires commentaire={commentaire2} />
            <Commentaires commentaire={commentaire3} />
          </div>
          <div className="w-1/3 ml-0 my-auto pt-12 max-sm:w-full">
            <PostVoteCard commentaire1="commentaire1" Nuance={Nuance} />
          </div>
        </div><div className="flex">
          <div className="w-1/3 max-sm:hidden pt-12">
            <Commentaires commentaire={commentaire1} />
            <Commentaires commentaire={commentaire2} />
            <Commentaires commentaire={commentaire3} />
          </div>
          <div className="w-1/3 ml-0 my-auto pt-12 max-sm:w-full">
            <PostVoteCard commentaire1="commentaire1" Nuance={Nuance} />
          </div>
        </div><div className="flex">
          <div className="w-1/3 max-sm:hidden pt-12">
            <Commentaires commentaire={commentaire1} />
            <Commentaires commentaire={commentaire2} />
            <Commentaires commentaire={commentaire3} />
          </div>
          <div className="w-1/3 ml-0 my-auto pt-12 max-sm:w-full">
            <PostVoteCard commentaire1="commentaire1" Nuance={Nuance} />
          </div>
        </div>
        <div className="absolute bottom-6 right-6 max-sm:hidden">
          <Link href="/post/vote">
            <button>
              <PlusButton />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

{
  /* <Commentaires commentaire={commentaire1} />
<Commentaires commentaire={commentaire2} />
<Commentaires commentaire={commentaire3} /> */
}
