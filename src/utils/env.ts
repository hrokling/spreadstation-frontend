/**
 * Environment Variables Utility
 * Provides type-safe access to Vite environment variables
 */

interface EnvironmentConfig {
  // Application
  appName: string;
  appVersion: string;

  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;

  // Authentication
  jwtStorageKey: string;
  jwtRefreshKey: string;

  // Features
  enableDebug: boolean;
  enableMockData: boolean;
  logLevel: string;
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, fallback = ''): string => {
  const value = import.meta.env[key] as string | undefined;
  return value ?? fallback;
};

/**
 * Get boolean environment variable
 */
const getBooleanEnvVar = (key: string, fallback = false): boolean => {
  const value = import.meta.env[key] as string | undefined;
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true' || value === '1';
};

/**
 * Get number environment variable
 */
const getNumberEnvVar = (key: string, fallback = 0): number => {
  const value = import.meta.env[key] as string | undefined;
  if (value === undefined) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Application Environment Configuration
 */
export const env: EnvironmentConfig = {
  // Application
  appName: getEnvVar('VITE_APP_NAME', 'SpreadStation'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),

  // API Configuration - Use the correct environment variable name
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000/api/v1'),
  apiTimeout: getNumberEnvVar('VITE_API_TIMEOUT', 30000),

  // Authentication
  jwtStorageKey: getEnvVar('VITE_JWT_STORAGE_KEY', 'spreadstation_token'),
  jwtRefreshKey: getEnvVar('VITE_JWT_REFRESH_KEY', 'spreadstation_refresh_token'),

  // Features
  enableDebug: getBooleanEnvVar('VITE_ENABLE_DEBUG', false),
  enableMockData: getBooleanEnvVar('VITE_ENABLE_MOCK_DATA', false),
  logLevel: getEnvVar('VITE_LOG_LEVEL', 'info'),
};

/**
 * Validate required environment variables
 */
export const validateEnvironment = (): void => {
  const requiredVars = [
    'VITE_API_BASE_URL',
  ];

  const missing = requiredVars.filter(varName => !getEnvVar(varName));

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }
};

// Validate on module load
validateEnvironment();

// Debug logging in development
if (import.meta.env.DEV) {
  console.log('🔧 Environment Configuration:', {
    apiBaseUrl: env.apiBaseUrl,
    appName: env.appName,
    enableDebug: env.enableDebug,
  });
}

/**
 * Check if we're in development mode
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Check if we're in production mode
 */
export const isProduction = import.meta.env.PROD;

/**
 * Get the current mode
 */
export const mode = import.meta.env.MODE;

export default env;
