import type { ReactNode } from "react";
import { FaCar, FaCog, FaDollarSign, FaPlane } from "react-icons/fa";

export interface Receipts {
  cdRecebimento: number;
  cdUsuario: number;
  cdCategoria: number;
  nmRecebimento: string;
  dtRecebimento: string;
  vlRecebimento: number;
  dsRecebimento: string;
}

export interface Expenses {
  cdGasto: number;
  cdUsuario: number;
  cdCategoria: number;
  nmGasto: string;
  dtGasto: string;
  vlGasto: number;
  dsGasto: string;
}

export type Transaction = Receipts & Expenses;

export const ICONS: Record<number, ReactNode> = {
  1: <FaCog />,
  2: <FaPlane />,
  3: <FaDollarSign />,
  4: <FaCar />,
};
