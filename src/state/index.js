import { atom } from "jotai";

export const hourAtom = atom(new Date().getHours());
export const minuteAtom = atom(new Date().getMinutes());
export const secondAtom = atom(new Date().getSeconds());
