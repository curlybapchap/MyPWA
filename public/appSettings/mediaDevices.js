
async function openMediaDevices(constraints) {
    return await navigator.mediaDevices.getUserMedia(constraints);
}

function RequestMediaPermission() {

navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      let audioSource = null;
      let videoSource = null;

      devices.forEach((device) => {
        if (device.kind === "audioinput") {
          audioSource = device.deviceId;
        } else if (device.kind === "videoinput") {
          videoSource = device.deviceId;
        }
      });
      sourceSelected(audioSource, videoSource);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });

    try {
        var stream = openMediaDevices({ 'video': true, 'audio': true });
        console.log('Got MediaStream:', stream);
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

async function sourceSelected(audioSource, videoSource) {
  const constraints = {
    audio: { deviceId: audioSource },
    video: { deviceId: videoSource },
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
}