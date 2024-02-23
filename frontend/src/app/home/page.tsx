"use client";
import { PolaroidType } from "@/interfaces/PolaroidTypes";
import { getAllPolaroids } from "@/services/polaroidService";

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

  useEffect(() => {
    getAllPolaroids().then((data) => {
      setAllPolaroids(data);
    });
  }, []);

  return <div>hello</div>;
}
