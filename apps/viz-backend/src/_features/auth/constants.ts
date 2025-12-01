export const jwtConstants = {
  secret:
    process.env.JWT_SECRET ||
    (() => {
      throw new Error('JWT_SECRET environment variable is not defined');
    })(),
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
