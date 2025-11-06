import axios from "axios";
import type { Receipts } from "../@types/transactions";

const API_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getReceipts(token: string): Promise<Receipts[]> {
  try {
    const response = await apiClient.get<Receipts[]>(
      `${API_URL}/recebimentos/usuario/${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getReceipts:", error);
    throw error;
  }
}

export async function updateReceipt(receipt: Receipts): Promise<Receipts> {
  try {
    const response = await apiClient.put<Receipts>(
      `${API_URL}/recebimentos/${receipt.cdRecebimento}`,
      receipt
    );
    return response.data;
  } catch (error) {
    console.error("Error in updateReceipt:", error);
    throw error;
  }
}

export async function deleteReceipt(receipt: Receipts): Promise<void> {
  try {
    await apiClient.delete(`${API_URL}/recebimentos/${receipt.cdRecebimento}`);
  } catch (error) {
    console.error("Error in deleteReceipt:", error);
    throw error;
  }
}