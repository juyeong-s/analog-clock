import { atom } from "jotai";

export const dateAtom = atom(new Date());
export const hourAtom = atom((get) => get(dateAtom).getHours());
export const minuteAtom = atom((get) => get(dateAtom).getMinutes());
export const secondAtom = atom((get) => get(dateAtom).getSeconds());
