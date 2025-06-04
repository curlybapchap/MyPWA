//https://developer.chrome.com/docs/capabilities/periodic-background-sync
//https://felixgerschau.com/periodic-background-sync-explained/


async function RegisterPeriodicBackgroundSync(syncName) {
    if (await RequestBackgroundSyncPermission() === "granted") {
        navigator.serviceWorker.ready.then(async registration => {
            try {
                var oneDayInMs = 24 * 60 * 60 * 1000;
                await registration.periodicSync.register(syncName, { minInterval: oneDayInMs });
                await ListenForSyncMessages();
                console.log('Periodic background sync registered.');
            } catch (err) {
                console.error(err.name, err.message);
            }
        });
    }
}

async function RequestBackgroundSyncPermission() {
    var status = await navigator.permissions.query({
        name: 'periodic-background-sync',
    });
    return status.state;
}

async function ListRegisteredSyncTags() {
    navigator.serviceWorker.ready.then(async registration => {
        console.log(await registration.periodicSync.getTags());
    });
}

async function AddSyncResultsToCache() {
    // Requires setting up the server side api function to call
    // untested and modified the fetch command in the original post, as it didn't make sense using string interpolation
    // https://web.dev/patterns/web-apps/periodic-background-sync/
    const backgroundSyncCache = await caches.open('latest-data');
    if (backgroundSyncCache) {
        const backgroundSyncResponse = backgroundSyncCache.match('api/latestData');
        if (backgroundSyncResponse) {
            var lastDataRequest = await fetch('api/latestData');
            var latestDataResponse = lastDataRequest.text();
            console.log(latestDataResponse);
        }
    }
}

async function ListenForSyncMessages() {
    navigator.serviceWorker.addEventListener('periodicsync', async (event) => {
        new Notification(`Periodic sync message from sync tag ${event.data.tag}`);
    });
}