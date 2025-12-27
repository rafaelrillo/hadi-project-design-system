// Path: src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "analyst" | "admin" | "viewer";
export type RiskProfile = "conservative" | "moderate" | "aggressive";

export interface UserPreferences {
  riskProfile: RiskProfile;
  theme: "dark";
  notifications: boolean;
  compactMode: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  clearError: () => void;
}

const defaultPreferences: UserPreferences = {
  riskProfile: "moderate",
  theme: "dark",
  notifications: true,
  compactMode: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, _password: string) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Accept any email/password for demo
        const user: User = {
          id: "user-1",
          email,
          name: email.split("@")[0],
          role: "analyst",
          preferences: defaultPreferences,
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      updatePreferences: (newPreferences: Partial<UserPreferences>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            preferences: {
              ...currentUser.preferences,
              ...newPreferences,
            },
          },
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "sentinel-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
