/**
 * Service Worker for Space Tourism Website
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'space-tourism-v1';
const RUNTIME_CACHE = 'space-tourism-runtime-v1';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/destination.html',
    '/crew.html',
    '/technology.html',
    '/design-system.html',
    '/404.html',
    '/index.css',
    '/booking.css',
    '/features.css',
    '/navigation.js',
    '/tabs.js',
    '/transitions.js',
    '/utils.js',
    '/enhancements.js',
    '/booking.js',
    '/countdown.js',
    '/faq.js',
    '/testimonials.js',
    '/manifest.json',
    '/assets/favicon-32x32.png',
    '/assets/shared/logo.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[ServiceWorker] Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            return name !== CACHE_NAME && name !== RUNTIME_CACHE;
                        })
                        .map((name) => {
                            console.log('[ServiceWorker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update cache in background
                    updateCache(request);
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((response) => {
                        // Don't cache error responses
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        // Cache the response for future use
                        const responseToCache = response.clone();
                        caches.open(RUNTIME_CACHE)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Network failed, try to serve 404 page
                        if (request.mode === 'navigate') {
                            return caches.match('/404.html');
                        }
                    });
            })
    );
});

// Update cache in background
function updateCache(request) {
    return fetch(request)
        .then((response) => {
            if (!response || response.status !== 200) {
                return;
            }
            
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
                .then((cache) => {
                    cache.put(request, responseToCache);
                });
        })
        .catch(() => {
            // Failed to update, keep existing cache
        });
}

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});

// Background sync for offline form submissions (if needed in future)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-bookings') {
        event.waitUntil(syncBookings());
    }
});

async function syncBookings() {
    // Placeholder for future offline booking sync
    console.log('[ServiceWorker] Syncing bookings...');
}

console.log('[ServiceWorker] Service Worker loaded');
