async function PersistData() {
    if (navigator.storage && navigator.storage.persist) {
        // const isPersisted = await navigator.storage.persist();
        // console.log(`Persisted storage granted: ${isPersisted}`);
        console.log("navigator.storage && navigator.storage.persist is available");
    }
}