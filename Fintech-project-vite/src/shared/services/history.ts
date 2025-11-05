import axios from "axios";
import type { Transaction } from "../@types/transactions";

const API_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getHistory(token: string): Promise<Transaction[]> {
  try {
    const response = await apiClient.get<Transaction[]>(
      `${API_URL}/usuarios/${token}/historico`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getHistory:", error);
    throw error;
  }
}
