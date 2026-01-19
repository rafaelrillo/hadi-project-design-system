// Path: src/services/auth/authService.ts

import { apiClient, ENDPOINTS } from "../api";
import { config } from "../../config/env";
import type { User, UserPreferences, RiskProfile } from "../../store/authStore";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthServiceConfig {
  useMock?: boolean;
}

class AuthService {
  private useMock: boolean;

  constructor(serviceConfig: AuthServiceConfig = {}) {
    this.useMock = serviceConfig.useMock ?? true;
  }

  setUseMock(value: boolean): void {
    this.useMock = value;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(1500);
      return this.simulateLogin(credentials);
    }

    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store token in API client for subsequent requests
    apiClient.setAuthToken(response.data.token);

    return response.data;
  }

  async logout(): Promise<void> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(300);
      apiClient.clearAuthToken();
      return;
    }

    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    apiClient.clearAuthToken();
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; expiresIn: number }> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(500);
      return {
        token: `mock-token-${Date.now()}`,
        expiresIn: 3600,
      };
    }

    const response = await apiClient.post<{ token: string; expiresIn: number }>(
      ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );

    apiClient.setAuthToken(response.data.token);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(300);
      return this.getMockUser();
    }

    const response = await apiClient.get<User>(ENDPOINTS.AUTH.ME);
    return response.data;
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(400);
      const currentUser = this.getMockUser();
      return {
        ...currentUser.preferences,
        ...preferences,
      };
    }

    const response = await apiClient.put<UserPreferences>(
      ENDPOINTS.USER.PREFERENCES,
      preferences
    );
    return response.data;
  }

  async updateRiskProfile(riskProfile: RiskProfile): Promise<void> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(300);
      return;
    }

    await apiClient.put(ENDPOINTS.USER.PREFERENCES, { riskProfile });
  }

  // Token management
  setToken(token: string): void {
    apiClient.setAuthToken(token);
  }

  clearToken(): void {
    apiClient.clearAuthToken();
  }

  // Mock implementations
  private simulateLogin(credentials: LoginCredentials): LoginResponse {
    // Accept any email/password for demo
    const user: User = {
      id: "user-1",
      email: credentials.email,
      name: credentials.email.split("@")[0],
      role: "analyst",
      plan: "b2c",
      preferences: {
        riskProfile: "moderate",
        theme: "dark",
        notifications: true,
        compactMode: false,
      },
    };

    return {
      user,
      token: `mock-token-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      expiresIn: 3600,
    };
  }

  private getMockUser(): User {
    return {
      id: "user-1",
      email: "demo@fing.app",
      name: "Demo User",
      role: "analyst",
      plan: "b2c",
      preferences: {
        riskProfile: "moderate",
        theme: "dark",
        notifications: true,
        compactMode: false,
      },
    };
  }

  private simulateDelay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const authService = new AuthService({
  useMock: config.api.useMock,
});

export default authService;
