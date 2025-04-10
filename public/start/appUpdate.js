if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { type: "module", })
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// window.isUpdateAvailable = new Promise(function (resolve, reject) {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('/sw.js')
//             .then(reg => {
//                 //persistData();
//                 reg.onupdatefound = () => {
//                     const installingWorker = reg.installing;
//                     installingWorker.onstatechange = () => {
//                         switch (installingWorker.state) {
//                             case 'installed':
//                                 if (navigator.serviceWorker.controller) {
//                                     // new update available
//                                     resolve(true);
//                                 } else {
//                                     // no update available
//                                     resolve(false);
//                                 }
//                                 break;
//                         }
//                     };
//                 };
//             })
//             .catch(err => console.error('[SW ERROR]', err));
//     }
// });

// window['isUpdateAvailable']
//     .then(isAvailable => {
//         if (isAvailable) {
//             var message = "<h3>🎈New Update Available🎈</h3>";
//             window.alert(message);
//             setTimeout(() => {
//                 window.location.reload(true)
//               }, 5000)
//         }
//     });