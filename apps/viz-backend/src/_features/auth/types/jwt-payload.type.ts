export type JwtPayload = {
  sub?: string;
  email?: string;
  iat?: number; // Issued at
  exp?: number; // Expiration
  [k: string]: any;
};
