export function isJwtToken(token: string): boolean {
  // Regular expression to match JWT token format
  const jwtTokenPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+$/;

  // Test if the provided token matches the JWT format
  return jwtTokenPattern.test(token);
}
