import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import BUNNY_CAT from "./../../public/images/bunny_cat.jpeg";

export default function Polaroid() {
  return (
    <div className="w-full z-50 min-w-xs max-w-xs bg-white shadow-lg">
      <div className="w-[320px] h-[320px] flex justify-center items-center">
        <Image
          src={BUNNY_CAT}
          alt={""}
          height={280}
          width={280}
          className="object-cover shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.05)]"
        />
      </div>
      <div className="px-6 pb-8 font-indieFlower">
        <h4 className="font-light text-sm">Date #2</h4>
        <h1 className="font-bold text-xl">French Dining at Parlour</h1>
        <div className="mt-1 flex">
          <h3 className="text-sm ">27/02/2024</h3>
          <div className="flex ml-auto">
            <StarIconSolid className="w-5" style={{ color: "#ffe234" }} />
            <StarIconSolid className="w-5" style={{ color: "#ffe234" }} />
            <StarIconSolid className="w-5" style={{ color: "#ffe234" }} />
            <StarIconSolid className="w-5" style={{ color: "#ffe234" }} />
            <StarIconOutline className="w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
