import axios from "axios";
import type { Expenses } from "../@types/transactions";

const API_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getExpenses(token: string): Promise<Expenses[]> {
  try {
    const response = await apiClient.get<Expenses[]>(
      `${API_URL}/gastos/usuario/${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getExpenses:", error);
    throw error;
  }
}
