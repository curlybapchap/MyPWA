export async function RequestPermission() {
    if (window.PublicKeyCredential && PublicKeyCredential.getClientCapabilities) {
        const capabilities = await PublicKeyCredential.getClientCapabilities();
        if (capabilities.conditionalCreate) {
            const cred = await navigator.credentials.create({
                publicKey: options,
                // Request conditional creation
                mediation: 'conditional'
            });
        }
    }

}