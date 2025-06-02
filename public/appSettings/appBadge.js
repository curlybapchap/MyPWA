function SetBadge() {
    if (navigator.setAppBadge) {
        navigator.setAppBadge(5);
    } else {
        // The API is not supported, don't use it.
    }
}