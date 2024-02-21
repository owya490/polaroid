import { Timestamp } from "firebase/firestore";

export interface PolaroidType {
  date: Timestamp;
  dateNumber: number;
  image: string;
  rating: number;
  title: string;
}
