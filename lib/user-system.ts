/**
 * user-system.ts
 * 
 * Utility functions for conditionally enabling/disabling the user system
 * based on the ENABLE_USER_SYSTEM environment variable.
 */

/**
 * Checks if the user system is enabled via environment variable
 * @returns true if ENABLE_USER_SYSTEM has any value, false otherwise
 */
export function isUserSystemEnabled(): boolean {
  return Boolean(process.env.ENABLE_USER_SYSTEM);
}

/**
 * Gets the appropriate redirect URL based on user system configuration
 * @returns '/login' if user system is enabled, '/#hero' if disabled
 */
export function getLoginRedirectUrl(): string {
  return isUserSystemEnabled() ? '/login' : '/#hero';
}

/**
 * Gets the appropriate sign up redirect URL based on user system configuration
 * @returns '/register' if user system is enabled, '/#hero' if disabled
 */
export function getSignUpRedirectUrl(): string {
  return isUserSystemEnabled() ? '/register' : '/#hero';
}