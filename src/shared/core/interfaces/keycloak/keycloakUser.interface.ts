export interface IKeycloakUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName?: string;
  enabled?: boolean;
  attributes?: {};
  groups?: [];
  emailVerified?: boolean;
  requiredActions?: string[];
  clientRoles?: {};
  realmRoles?: string[];
}
