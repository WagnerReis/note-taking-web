interface ApiClientOptions {
  baseURL?: string;
}

class AuthClient {
  private baseURL: string;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(options: ApiClientOptions = {}) {
    this.baseURL = options.baseURL || "";
  }

  private async refreshToken(): Promise<boolean> {
    // Se já está fazendo refresh, aguarda o resultado
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
        credentials: "include",
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
    // Primeira tentativa com cookies
    const response = await this.makeRequest(url, options);

    // Se não é 401, retorna a resposta
    if (response.status !== 401) {
      return response;
    }

    // Se é 401, tenta fazer refresh
    const refreshSuccess = await this.refreshToken();

    if (!refreshSuccess) {
      // Se refresh falhou, dispara evento de logout
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
      credentials: "include", // Sempre envia cookies
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  private handleAuthFailure(): void {
    // Dispara evento customizado para componentes React escutarem
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

  async patch(
    url: string,
    data?: any,
    options?: RequestInit,
  ): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // Método para fazer logout (limpa cookies no backend)
  async logout(): Promise<void> {
    try {
      await this.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Dispara evento de logout independente do resultado
      this.handleAuthFailure();
    }
  }
}

// Instância singleton
export const authClient = new AuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
});

// Função helper para requisições com tratamento automático de JSON
export const api = {
  get: async <T>(url: string): Promise<T> => {
    const response = await authClient.get(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  },

  post: async <T>(url: string, data?: any): Promise<T> => {
    const response = await authClient.post(url, data);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  },
  put: async <T>(url: string, data?: any): Promise<T> => {
    const response = await authClient.put(url, data);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await authClient.delete(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  },
  patch: async <T>(url: string, data?: any): Promise<T> => {
    const response = await authClient.patch(url, data);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  },
};
