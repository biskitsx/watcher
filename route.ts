/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/movies",
    "/anime",
    "series"
]

/**
 * An array of private routes that require authenticate
 * @type {string[]}
 */
export const privateRoutes: string[] = [
    "/track",
    "/recommend",
    "/calendar",
    "/profile"
]

/**
 * An array of protected routes that require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
]

/**
 * The prefix for the authenticate routes
 * @type {string}
 */ 
export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/"