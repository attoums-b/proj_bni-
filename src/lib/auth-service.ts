// ============================================================
// SERVICE D'AUTHENTIFICATION
// ============================================================
// Encapsule les appels d'authentification au backend.

import { apiPost, saveToken, clearToken } from "./api";

// ===== TYPES =====
export type LoginRequest = {
  matricule: string;
  password: string;
};

export type LoginResponse = {
  token: string | null;
  status: number;
  message: string;
};

// ============================================================
// LOGIN
// ============================================================
// Appelle POST /api/users/login avec matricule + password
// Si succès : stocke le token et retourne true
// Si échec : retourne false avec le message d'erreur
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  // requiresAuth = false car on n'a pas encore de token au login
  const response = await apiPost<LoginResponse>(
    "/users/login",
    credentials,
    false
  );

  // Si succès, on stocke le token
  if (response.status === 200 && response.token) {
    saveToken(response.token);
  }

  return response;
}

// ============================================================
// LOGOUT
// ============================================================
export function logout() {
  clearToken();
  // Optionnel : appeler le backend pour invalider le token côté serveur
  // (pas nécessaire avec JWT stateless)
}