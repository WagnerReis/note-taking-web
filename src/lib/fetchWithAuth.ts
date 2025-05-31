type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchWithAuthOptions extends RequestInit {
  method?: FetchMethod;
  timeout?: number;
  parseJson?: boolean;
}

interface ApiError {
  status: number;
  message: string;
  details?: any;
}

export async function fetchWithAuth<T = any>(
  url: string,
  options: FetchWithAuthOptions = {},
): Promise<T> {
  const {
    timeout = 10000,
    parseJson = true,
    method = "GET",
    headers,
    ...rest
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const doFetch = async (): Promise<Response> => {
    return await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
      signal: controller.signal,
      ...rest,
    });
  };

  let res = await doFetch();

  clearTimeout(id);

  if (res.status === 401) {
    const refresh = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    console.log("🚀 ~ refresh:", refresh);

    if (!refresh.ok) {
      throw <ApiError>{
        status: 401,
        message: "Session expired. Please log in again.",
      };
    }

    res = await doFetch();
  }

  if (!res.ok) {
    let errorMessage = "Request error";
    let details = null;

    try {
      const errorBody = await res.json();
      errorMessage = errorBody.message || errorMessage;
      details = errorBody;
    } catch (_) {}

    throw <ApiError>{
      status: res.status,
      message: errorMessage,
      details,
    };
  }

  if (!parseJson) return res as any;

  return { status: 200 } as T;
}
