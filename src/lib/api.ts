// ============================================================
// HELPER POUR LES APPELS API VERS LE BACKEND BNI
// ============================================================
// Centralise la gestion du token JWT et des appels HTTP.
// Utilisation :
//   - apiPost("/users/login", { matricule, password })
//   - apiGet("/sites")
//   - apiPatch("/reservations/123/approve")
// Le token JWT est automatiquement ajouté aux requêtes (sauf login).

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

// ============================================================
// GESTION DU TOKEN JWT
// ============================================================

// Stocker le token après login réussi
export function saveToken(token: string) {
  localStorage.setItem("bni_token", token);
}

// Récupérer le token stocké
export function getToken(): string | null {
  if (typeof window === "undefined") return null; // côté serveur (SSR)
  return localStorage.getItem("bni_token");
}

// Supprimer le token (logout)
export function clearToken() {
  localStorage.removeItem("bni_token");
}

// Vérifier si l'utilisateur est connecté
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// ============================================================
// FONCTION GÉNÉRIQUE D'APPEL API
// ============================================================
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth: boolean = true
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  // Construire les headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Ajouter le token JWT si nécessaire (sauf pour le login)
  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // Faire la requête
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Gérer les erreurs
  if (!response.ok) {
    // Token expiré ou invalide → rediriger vers login
    if (response.status === 401 && requiresAuth) {
      clearToken();
      window.location.href = "/connexion/sign-in";
      throw new Error("Session expirée, veuillez vous reconnecter");
    }

    // Essayer de lire le message d'erreur du backend
    let errorMessage = `Erreur ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // Si la réponse n'est pas du JSON, on garde le message générique
    }
    throw new Error(errorMessage);
  }

  // Retourner les données (gérer le cas 204 No Content)
  // Retourner les données (gérer le cas 204 No Content ou réponse vide)
  if (response.status === 204) {
    return null as T;
  }

  // Vérifier s'il y a du contenu à lire avant de faire .json()
  const text = await response.text();
  return text ? JSON.parse(text) : (null as T);
}

// ============================================================
// MÉTHODES HTTP RACCOURCIES
// ============================================================

// GET (avec authentification par défaut)
export function apiGet<T>(endpoint: string, requiresAuth = true): Promise<T> {
  return apiCall<T>(endpoint, { method: "GET" }, requiresAuth);
}

// POST
export function apiPost<T>(
  endpoint: string,
  body?: unknown,
  requiresAuth = true
): Promise<T> {
  return apiCall<T>(
    endpoint,
    {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    },
    requiresAuth
  );
}

// PATCH
export function apiPatch<T>(
  endpoint: string,
  body?: unknown,
  requiresAuth = true
): Promise<T> {
  return apiCall<T>(
    endpoint,
    {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    },
    requiresAuth
  );
}

// PUT
export function apiPut<T>(
  endpoint: string,
  body?: unknown,
  requiresAuth = true
): Promise<T> {
  return apiCall<T>(
    endpoint,
    {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    },
    requiresAuth
  );
}

// DELETE
export function apiDelete<T>(
  endpoint: string,
  requiresAuth = true
): Promise<T> {
  return apiCall<T>(endpoint, { method: "DELETE" }, requiresAuth);
}