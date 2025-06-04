"use client";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export function useApi() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthLogout = () => {
      router.push("/login");
    };

    window.addEventListener("auth:logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
    };
  }, [router]);

  const request = useCallback(
    async <T>(requestFn: () => Promise<Response>): Promise<T> => {
      try {
        const response = await requestFn();
        console.log("aaaaaaaaa", response);

        const authRoutes = ["/login", "/register"];

        const isAuthRoute = authRoutes.some((route) =>
          response.url.includes(route),
        );
        const isErrorResponse = !response.ok;

        if (isErrorResponse && !isAuthRoute) {
          const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          throw new Error(errorMessage);
        }

        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error;
      }
    },
    [],
  );

  return {
    get: useCallback(
      <T>(url: string) => request<T>(() => apiClient.get(url)),
      [request],
    ),

    post: useCallback(
      <T>(url: string, data?: any) =>
        request<T>(() => apiClient.post(url, data)),
      [request],
    ),

    put: useCallback(
      <T>(url: string, data?: any) =>
        request<T>(() => apiClient.put(url, data)),
      [request],
    ),

    delete: useCallback(
      <T>(url: string) => request<T>(() => apiClient.delete(url)),
      [request],
    ),

    logout: useCallback(() => apiClient.logout(), []),
  };
}
