async function RequestPushNoticationsPermission() {
    var permission = await Notification.requestPermission()
    if (permission === "granted") {
        console.log("The user accepted to receive notifications");
        subscribeToPushMessages();
    }
}

async function subscribeToPushMessages() {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;

    // Check if the user has an existing subscription
    let pushSubscription = await serviceWorkerRegistration.pushManager.getSubscription();
    if (pushSubscription) {
        // The user is already subscribed to push notifications
        var p256dh = base64Encode(pushSubscription.getKey('p256dh'));
        var auth = base64Encode(pushSubscription.getKey('auth'));
        console.log(pushSubscription);
        console.log(`#PushEndpoint = ${pushSubscription.endpoint}`);
        console.log(`#PushP256DH = ${p256dh}`);
        console.log(`#PushAuth = ${auth}`);
        await listen();
        return;
    }

    try {
        // Subscribe the user to push notifications
        pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BOu-LziCq2W4b-NRJK85nCfRwxYB32GZebjKGNS-KWl6YmKnmd_bUa_YPCYJrOtuL-3-5cut74EPUQ3MsS1wWNI")
        });


        var p256dh = base64Encode(pushSubscription.getKey('p256dh'));
        var auth = base64Encode(pushSubscription.getKey('auth'));

        console.log(pushSubscription);

        console.log(`#PushEndpoint = ${pushSubscription.endpoint}`);
        console.log(`#PushP256DH = ${p256dh}`);
        console.log(`#PushAuth = ${auth}`);

    } catch (err) {
        // The subscription wasn't successful.
        console.log("Error", err);
    }
}

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function base64Encode(arrayBuffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
}

async function listen() {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.addEventListener('push', function (event) {
        if (!(serviceWorkerRegistration.Notification && serviceWorkerRegistration.Notification.permission === 'granted')) {
            return;
        }

        var data = {};
        if (event.data) {
            data = event.data.json();
        }

        console.log('Notification Received:');
        console.log(data);

        var title = data.title;
        var message = data.message;
        var icon = "images/push-icon.jpg";

        event.waitUntil(serviceWorkerRegistration.registration.showNotification(title, {
            body: message,
            icon: icon,
            badge: icon
        }));
    });

    serviceWorkerRegistration.addEventListener('notificationclick', function (event) {
        event.notification.close();
    });
}