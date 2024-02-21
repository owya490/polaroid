import { PolaroidType } from "@/interfaces/PolaroidTypes";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";

export async function getAllPolaroids(): Promise<PolaroidType[]> {
  const polardoidCollectionRef = collection(db, "polaroid");
  const polaroidSnapshot = await getDocs(polardoidCollectionRef);
  const polaroidData: PolaroidType[] = [];

  polaroidSnapshot.forEach((doc) => {
    if (doc.id !== "counter") {
      const polaroid = doc.data() as PolaroidType;
      polaroidData.push(polaroid);
    }
  });
  return polaroidData;
}

export async function createPolaroid({
  title,
  image,
  rating,
}: {
  title: string;
  image: File;
  rating: number;
}) {
  const dateNumber = await getDateNumber();
  const imageUrl = await uploadPolaroidImage(image, dateNumber);
  try {
    const docRef = await addDoc(collection(db, "polaroid"), {
      title: title,
      image: imageUrl,
      rating: rating,
      dateNumber: dateNumber,
      date: Timestamp.fromDate(new Date()),
    });
    await incrementDateNumber();
    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadPolaroidImage(image: File, dateNumber: number) {
  const imagePath = `polaroid/${dateNumber}`;
  const imageRef = ref(storage, imagePath);

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(imageRef, image);

    // Get the download URL of the uploaded file
    const url = await getDownloadURL(imageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
}

async function incrementDateNumber() {
  await updateDoc(doc(db, "polaroid", "counter"), {
    count: increment(1),
  });
}

async function getDateNumber() {
  return (await getDoc(doc(db, "polaroid", "counter"))).data()!.count;
}
