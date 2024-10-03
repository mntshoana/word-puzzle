
/**
 * Service for interacting with the session storage.
 */
export default class SessionStorageService {
    /**
     * Writes a value to the session storage.
     * @param key - The key to store the value under.
     * @param value - The value to store.
     */
    write(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Reads a value from the session storage.
     * @param key - The key of the value to read.
     * @returns The value stored under the given key, or null if the key does not exist.
     */
    read(key: string): string | null {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    /**
     * Removes a value from the session storage.
     * @param key - The key of the value to remove.
     */
    remove(key: string): void {
        sessionStorage.removeItem(key);
    }


    /**
     * Clears all values from the session storage.
     */
    clear(): void {
        sessionStorage.clear();
    }

    /**
     * Gets all keys in the session storage.
     * @returns An array of all keys in the session storage.
     */
    getAll(): string[] {
        return Object.keys(sessionStorage);
    }
}