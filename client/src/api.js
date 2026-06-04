export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const buildHeaders = (token, extra) => {
  const headers = { "Content-Type": "application/json", ...(extra || {}) };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const request = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, options);
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }
  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
};

export const api = {
  register: (payload) =>
    request("/api/auth/register", {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request("/api/auth/login", {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(payload)
    }),
  me: (token) => request("/api/auth/me", { headers: buildHeaders(token) }),
  getTasks: (token, params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set("search", params.search);
    if (params.status && params.status !== "all") searchParams.set("status", params.status);
    const query = searchParams.toString();
    return request(`/api/tasks${query ? `?${query}` : ""}`, { headers: buildHeaders(token) });
  },
  createTask: (token, payload) =>
    request("/api/tasks", {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(payload)
    }),
  updateTask: (token, id, payload) =>
    request(`/api/tasks/${id}`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(payload)
    }),
  deleteTask: (token, id) =>
    request(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: buildHeaders(token)
    }),
  toggleTask: (token, id) =>
    request(`/api/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: buildHeaders(token)
    })
};
