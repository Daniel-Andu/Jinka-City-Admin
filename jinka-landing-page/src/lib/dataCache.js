const clientCache = new Map();

export function getCachedData(key) {
    return clientCache.get(key);
}

export function setCachedData(key, value) {
    clientCache.set(key, value);
}
