import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña usando bcrypt
 * @param password - La contraseña en texto plano
 * @returns Promesa que resuelve al hash de la contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña en texto plano con su hash
 * @param password - Contraseña en texto plano
 * @param hash - Hash de bcrypt
 * @returns Promesa que resuelve a true si coinciden, false si no
 */
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
