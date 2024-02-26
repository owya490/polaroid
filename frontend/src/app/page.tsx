"use client";
import CustomInput from "@/components/Input";
import Polaroid from "@/components/Polaroid";
import { PolaroidType } from "@/interfaces/PolaroidTypes";
import { createPolaroid, getAllPolaroids } from "@/services/polaroidService";
import {
  HeartIcon,
  PlusIcon,
  StarIcon as StarIconOutline,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

interface NewPolaroid {
  title: string;
  image: File | undefined;
  rating: number;
}

const EMPTY_NEW_POLAROID = {
  title: "",
  image: undefined,
  rating: 0,
};

export default function Home() {
  const [newPolaroid, setNewPolaroid] =
    useState<NewPolaroid>(EMPTY_NEW_POLAROID);
  const [allPolaroids, setAllPolaroids] = useState<PolaroidType[]>([]);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(true);
  const [passcode, setPasscode] = useState("");

  useEffect(() => {
    getAllPolaroids().then((data) => {
      setAllPolaroids(data);
    });
  }, []);

  return isNotLoggedIn ? (
    <main className="h-screen bg-white flex justify-center items-center">
      <div className="flex">
        <CustomInput
          placeholder={"Enter the passcode"}
          value={passcode}
          handleChange={(v) => {
            setPasscode(v);
          }}
        />
        <button
          className="bg-blue-300 text-white w-10 ml-2 border-1 border border-blue-gray-200 active:bg-blue-400 active:border-gray-300"
          onClick={() => {
            if (passcode === "2749") {
              setIsNotLoggedIn(false);
            }
          }}
        >
          {"->"}
        </button>
      </div>
    </main>
  ) : (
    <main className="bg-blue-200 h-full min-h-screen">
      <div className="border border-b-[1px] h-14 bg-white shadow-md flex items-center">
        <h1 className="ml-5 mr-2 font-indieFlower text-2xl">Ashley and Owen</h1>
        <HeartIcon className="w-5 h-5" />
      </div>
      <div className="w-full flex justify-center mt-6">
        <div className="w-full md:w-[85vw] lg:w-[95vw] xl:w-[95vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 justify-items-center">
          {allPolaroids
            .sort((a, b) => {
              return b.dateNumber - a.dateNumber;
            })
            .map((data, idx) => {
              return <Polaroid key={idx} {...data} />;
            })}
        </div>
      </div>
      <button
        className="bg-slate-50 rounded-full w-14 h-14 flex items-center justify-center shadow-xl z-50 bottom-4 right-4 fixed active:shadow-inner active:bg-slate-100"
        onClick={() => {
          document
            .getElementById("create-modal")!
            .classList.replace("h-0", "h-[50vh]");
        }}
      >
        <PlusIcon className="w-6 h-6" />
      </button>
      <div
        id="create-modal"
        className="bg-slate-50 w-full h-0 transition-all bottom-0 fixed z-50"
      >
        <div className="w-full flex items-center">
          <button
            className="ml-auto mt-2 mr-2 w-7 h-7"
            onClick={() => {
              document
                .getElementById("create-modal")!
                .classList.replace("h-[50vh]", "h-0");
            }}
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[75vw] font-indieFlower">
            <h2 className="text-2xl">Create Polaroid!</h2>
            <input
              accept="image/*"
              type="file"
              className="w-full mb-10 mt-6"
              onChange={(e) => {
                if (e.target.files !== null) {
                  setNewPolaroid({
                    ...newPolaroid,
                    image: e.target.files![0],
                  });
                }
              }}
            />
            <CustomInput
              placeholder={"What are we doing?"}
              value={newPolaroid.title}
              handleChange={(value) => {
                setNewPolaroid({
                  ...newPolaroid,
                  title: value,
                });
              }}
            />
            <div className="my-6">
              <label>How would you rate it?</label>
              <div className="flex">
                {Array(5)
                  .fill("")
                  .map((_, idx) => {
                    const index = idx + 1;
                    return index <= newPolaroid.rating ? (
                      <StarIconSolid
                        key={idx}
                        className="w-8 h-8"
                        style={{ color: "#ffe234" }}
                        onClick={() => {
                          setNewPolaroid({
                            ...newPolaroid,
                            rating: index,
                          });
                        }}
                      />
                    ) : (
                      <StarIconOutline
                        key={idx}
                        className="w-8 h-8"
                        onClick={() => {
                          setNewPolaroid({
                            ...newPolaroid,
                            rating: index,
                          });
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="w-full flex items-center">
              <button
                className="border border-black px-2.5 py-1 ml-auto active:bg-slate-300 hover:bg-slate-100"
                onClick={async () => {
                  document
                    .getElementById("create-modal")!
                    .classList.replace("h-[50vh]", "h-0");
                  if (
                    newPolaroid.image !== undefined &&
                    newPolaroid.title !== ""
                  ) {
                    await createPolaroid({
                      title: newPolaroid.title,
                      image: newPolaroid.image!,
                      rating: newPolaroid.rating,
                    });
                    setAllPolaroids(await getAllPolaroids());
                  }
                  setNewPolaroid(EMPTY_NEW_POLAROID);
                }}
              >
                Create!
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
