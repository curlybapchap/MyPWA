export async function RequestPermission() {
    if (!window.DeviceMotionEvent || !window.DeviceMotionEvent.requestPermission) {
        return alert("Your current device does not have access to the DeviceMotion event");
    }

    let permission = await window.DeviceMotionEvent.requestPermission();
    if (permission !== "granted") {
        return alert("You must grant access to the device's sensor for this demo");
    }

    window.addEventListener("devicemotion", (event) => {
        console.log(`${event.acceleration.x} m/s2`);
    });
}