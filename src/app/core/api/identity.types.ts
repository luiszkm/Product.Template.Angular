/** Contratos da API Identity conforme frontend-integration-guide.md */

export interface UserOutput {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AuthTokenOutput {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastLoginAt: string | null;
    roles: string[];
  };
}
