import axios from "axios";
import type { Authentication, UserInfo } from "@/shared/@types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function doLogin(email: string, senha: string) {
  try {
    const response = await apiClient.get<boolean>(
      `/autenticacao/buscar?email=${email}&senha=${senha}`,
    );
    const { data } = response;
    if (!data) throw new Error("Usuário ou senha inválidos");
    localStorage.setItem("token", data.toString());
    return data;
  } catch (error) {
    console.error("Error in doLogin:", error);
    throw error;
  }
}

export async function doRegister(userInfo: UserInfo & Authentication) {
  try {
    const response = await apiClient.post<UserInfo>("/usuarios", userInfo);
    const { data } = response;

    await createAuthentication({
      email: userInfo.email,
      senha: userInfo.senha,
      cdUsuario: data.cdUsuario,
    });
    return data;
  } catch (error) {
    console.error("Error in doRegister:", error);
    throw error;
  }
}

export function doLogout() {
  console.log("Logout");
}

export async function createAuthentication(userInfo: Authentication) {
  try {
    const response = await apiClient.post<Authentication>(
      "/autenticacao",
      userInfo
    );
    return response.data;
  } catch (error) {
    console.error("Error in createAuthentication:", error);
    throw error;
  }
}

export async function getUser(token: string) {
  try {
    const response = await apiClient.get<UserInfo>(`/usuarios/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
}