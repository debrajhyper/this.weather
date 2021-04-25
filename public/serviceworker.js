const CACHE_NAME = "version-1"
const urlsToCache = [ 
    'index.html', 
    'offline.html', 
    './static/css/2.4c97ca4f.chunk.css', 
    './static/css/main.d9453a98.chunk.css',
    './static/js/2.01555491.chunk.js',
    './static/js/3.111b3ef9.chunk.js',
    './static/js/main.a3e2b3a5.chunk.js',
    './static/js/runtime-main.9aa70c26.js'
]

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});


// Listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then (() => {
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    )
});


// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheNames) => {
                if(!cacheWhiteList.includes(cacheNames)) {
                    return caches.delete(cacheNames)
                }
            })
        ))
    )
});