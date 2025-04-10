        navigator.serviceWorker.register('/sw.js', { type: "module", })

window['isUpdateAvailable']
    .then(isAvailable => {
        if (isAvailable) {
            var message = "<h3>🎈New Update Available🎈</h3>";
            window.alert(message);
            setTimeout(() => {
                window.location.reload(true)
              }, 5000)
        }
    });