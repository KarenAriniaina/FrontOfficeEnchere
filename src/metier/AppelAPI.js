export const getListeCategorie = async () => {
    try {
        const response = fetch("http://localhost:8080/Categories/");
        response.json().then(res => {
            return res;
        })
    } catch (error) {
        return error;
    }
}

export const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));
    if ('caches' in window) {
        caches.open(cacheName).then((cache) => {
            cache.put(url, data);
            alert('Data Added into cache!')
        });
    }
};

export const getSingleCacheData = async (cacheName, url) => {
    if (typeof caches === 'undefined') return false;
    
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return "Failed";
    }
  
    return cachedResponse.json();
  };
  