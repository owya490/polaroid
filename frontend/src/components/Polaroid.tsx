import { PolaroidType } from "@/interfaces/PolaroidTypes";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Polaroid({
  date,
  dateNumber,
  image,
  rating,
  title,
}: PolaroidType) {
  const emptyStarLength = 5 - rating;

  const dateObject = date.toDate();
  const dateString = dateObject.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // Saturday, September 17, 2016
  return (
    <div className="w-full z-50 min-w-xs max-w-xs bg-white shadow-lg">
      <div className="w-[320px] h-[320px] flex justify-center items-center">
        <Image
          priority
          src={image}
          alt={""}
          height={280}
          width={280}
          className="object-cover w-[280px] h-[280px] shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.05)]"
        />
      </div>
      <div className="px-6 pb-8 font-indieFlower">
        <h4 className="font-light text-sm">{`Date #${dateNumber}`}</h4>
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="mt-1 flex">
          <h3 className="text-sm ">{dateString}</h3>
          {/* <h3 className="text-sm ">27/02/2024</h3> */}
          {/* 27/02/2024 */}
          <div className="flex ml-auto">
            {Array(rating)
              .fill("")
              .map((_, idx) => {
                return (
                  <StarIconSolid
                    key={idx}
                    className="w-5"
                    style={{ color: "#ffe234" }}
                  />
                );
              })}
            {Array(emptyStarLength)
              .fill("")
              .map((_, idx) => {
                return <StarIconOutline key={idx} className="w-5" />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
