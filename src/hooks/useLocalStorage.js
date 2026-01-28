import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - initial value if not in storage
 * @returns {Array} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
    // Initialize state from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) return JSON.parse(item);
            return typeof initialValue === 'function' ? initialValue() : initialValue;
        } catch {
            return typeof initialValue === 'function' ? initialValue() : initialValue;
        }
    });

    // Sync state only when the KEY changes (e.g. switching JSC -> SSC)
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            } else {
                const val = typeof initialValue === 'function' ? initialValue() : initialValue;
                setStoredValue(val);
            }
        } catch {
            const val = typeof initialValue === 'function' ? initialValue() : initialValue;
            setStoredValue(val);
        }
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
    /* eslint-enable react-hooks/set-state-in-effect */

    // Update localStorage whenever storedValue changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch {
            // Silently ignore storage errors in production
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};
