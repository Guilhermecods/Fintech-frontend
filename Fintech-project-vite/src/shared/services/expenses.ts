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

export async function updateExpense(expense: Expenses): Promise<Expenses> {
  try {
    const response = await apiClient.put<Expenses>(
      `${API_URL}/gastos/${expense.cdGasto}`,
      expense
    );
    return response.data;
  } catch (error) {
    console.error("Error in updateExpense:", error);
    throw error;
  }
}

export async function deleteExpense(expense: Expenses): Promise<void> {
  try {
    await apiClient.delete(`${API_URL}/gastos/${expense.cdGasto}`);
  } catch (error) {
    console.error("Error in deleteExpense:", error);
    throw error;
  }
}