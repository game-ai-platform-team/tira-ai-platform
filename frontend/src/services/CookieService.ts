/**
 * Retrieve the value of a cookie by name
 * @param name Name of the cookie
 * @returns Value of the cookie, or undefined if it does not exist
 */
export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
}

/**
 * Set a cookie with the specified name and value
 * @param name Name of the cookie
 * @param value Value to set for the cookie
 * @param path Optional path to specify where the cookie should be accessible, defaults to "/"
 */
export function setCookie(name: string, value: string, path: string = "/"): void {
    document.cookie = `${name}=${value}; path=${path}`;
}

/**
 * Remove a cookie
 * @param name Name of the cookie to remove
 * @param path Optional path of the cookie, defaults to "/"
 */
export function removeCookie(name: string, path: string = "/"): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}
