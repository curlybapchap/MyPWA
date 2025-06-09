export function RequestPermission() {
    if ("geolocation" in navigator) {
        var options = {
            body: "Created by Paul Logan"
        };

        new Notification("geolocation is available", options);
        navigator.geolocation.getCurrentPosition((position) => {

            new Notification(`Latitude : ${position.coords.latitude}, Longitude : ${position.coords.longitude}`);

        });
    } else {

        new Notification("GeoLocation is NOT available 😒")
    }
}

function GetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        new Notification(`Latitude : ${position.coords.latitude}, Longitude : ${position.coords.longitude}`);
    });
}

function WatchForPositionChange() {
    var watchID = navigator.geolocation.watchPosition((position) => {
        new Notification(`Position Change => Latitude : ${position.coords.latitude}, Longitude : ${position.coords.longitude}`);
    });
    return watchID;
}

function StopWatching(watchID) {
    navigator.geolocation.clearWatch(watchID);
}