import { collection, deleteDoc, doc, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/Backend/Firebase/firebase";

export const getMobileAPI = async (limitQuery: number) => {
  try {
    const mobileRef = collection(db, "mobiles");
    const q = query(mobileRef, limit(limitQuery));
    const res = await getDocs(q);
    const mobiles = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return mobiles;
  } catch (error) {
    console.log(error);
  }
};
export const getLaptopAPI = async (limitQuery: number) => {
  try {
    const laptopRef = collection(db, "gadget_rambo/products/laptops");
    const q = query(laptopRef, limit(limitQuery));
    const res = await getDocs(q);
    const laptops = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return laptops;
  } catch (error) {
    console.log(error);
  }
};
export const getTvAPI = async (limitQuery: number) => {
  try {
    const tvRef = collection(db, "tv");
    const q = query(tvRef, limit(limitQuery));
    const res = await getDocs(q);
    const tv = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return tv;
  } catch (error) {
    console.log(error);
  }
};


export const deleteLaptopAPI = async (id: string) => {
    const laptopRef = doc(db, "gadget_rambo/products/laptops", id);
    return await deleteDoc(laptopRef);
}

export const deleteMobileAPI = async (id: string) => {
  const laptopRef = doc(db, "tv", id);
  return await deleteDoc(laptopRef);
}

export const deleteTvAPI = async (id: string) => {
  const laptopRef = doc(db, "laptops", id);
  return await deleteDoc(laptopRef);
}