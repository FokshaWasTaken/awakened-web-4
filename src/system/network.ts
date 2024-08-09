const cache: Map<string, Response> = new Map<string, Response>();

//Fetch an url and cache it, only for that session
export async function cachedFetch(url: string, options?: RequestInit) {
    //If the url is not cached, fetch it and cache it
    if (!cache.has(url)) {
        const result: Response = await fetch(url, options);

        //Don't store the response itself as it can only be read once
        cache.set(url, result);
    }

    //Never return the response itself as it can only be read once
    const cached: Response = cache.get(url) as Response;
    return cached.clone();
}