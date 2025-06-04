async function RequestNotifications() {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications.");
        return;
    }
    var permission = await Notification.requestPermission();
    if (permission === "granted") {
        new Notification(`Permission for Notifications has been granted by the user`);
    }
}