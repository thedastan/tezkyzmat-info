// services/authService.ts
import { PUBLIC_API } from "@/api/interceptors";

export async function login(username: string, password: string) {
	const response = await PUBLIC_API.post("auth/login/", { username, password });
	localStorage.setItem("accessToken", response.data.access_token);
	return response.data;
}

export function logout() {
	localStorage.removeItem("accessToken");
}





