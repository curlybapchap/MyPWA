//https://developer.chrome.com/blog/background-sync/#what_could_i_use_background_sync_for

export async function Request() {
    navigator.serviceWorker.ready.then(async registration => {
        return registration.sync.register('myFirstSync');
    });
}

export async function ListenForSyncs() {
    navigator.serviceWorker.ready.then(async registration => {
        registration.addEventListener('sync', event => {
            if (event.tag == 'myFirstSync') {
                event.waitUntil(doSomeStuff(event.tag));
            }
        });
    });
}

function doSomeStuff(tagName) {
    new Notification(`Background Sync event ${tagName}`);
}