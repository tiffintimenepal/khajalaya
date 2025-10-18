// Service Worker Cache Clearer
// Run this in your browser console to clear the service worker cache

if ('serviceWorker' in navigator) {
    // Unregister the current service worker
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
            console.log('Service Worker unregistered');
        }
    });
    
    // Clear all caches
    caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                console.log('Deleting cache:', cacheName);
                return caches.delete(cacheName);
            })
        );
    }).then(function() {
        console.log('All caches cleared!');
        // Reload the page
        window.location.reload(true);
    });
} else {
    console.log('Service Worker not supported');
}
