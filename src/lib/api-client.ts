interface ApiClientOptions {
  baseURL?: string;
  credentials?: RequestCredentials;
}

class ApiClient {
  private baseURL: string;
  private credentials: RequestCredentials;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(options: ApiClientOptions = {}) {
    this.baseURL = options.baseURL || "";
    this.credentials = options.credentials || "include";
  }

  private async refreshToken(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        credentials: this.credentials,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }

  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    const response = await this.makeRequest(url, options);

    if (response.status !== 401) {
      return response;
    }

    const refreshSuccess = await this.refreshToken();

    if (!refreshSuccess) {
      this.handleAuthFailure();
      return response;
    }

    // Se refresh deu certo, tenta a requisição novamente
    return this.makeRequest(url, options);
  }

  private async makeRequest(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const fullUrl = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    return fetch(fullUrl, {
      ...options,
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  private handleAuthFailure(): void {
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }

  // Métodos de conveniência
  async get(url: string, options?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...options, method: "GET" });
  }

  async post(
    url: string,
    data?: any,
    options?: RequestInit,
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(url: string, data?: any, options?: RequestInit): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(url: string, options?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...options, method: "DELETE" });
  }

  // Método para fazer logout (limpa cookies no backend)
  async logout(): Promise<void> {
    try {
      await this.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Redireciona independente do resultado
      window.location.href = "/login";
    }
  }
}

// Instância singleton
export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000",
  credentials: "include",
});
