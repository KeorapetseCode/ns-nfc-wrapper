import { EventData, Page, Observable, Application, Utils } from '@nativescript/core';

// This function is called when the page is loading.
export function navigatingTo(args: EventData) {
    // Get the Page instance from the event arguments.
    const page = <Page>args.object;

    // Create a new Observable. This will be our view model.
    const viewModel = new Observable();
    viewModel.set("isNfcAvailable", false);
    viewModel.set("showKeypad", false); // Hide keypad - NFC only
    viewModel.set("message", "Checking NFC...");
    
    console.log("🔍 Checking NFC availability...");

    // Check NFC availability using native Android API
    try {
        if (Application.android) {
            const context = Utils.ad.getApplicationContext();
            const nfcManager = context.getSystemService(android.content.Context.NFC_SERVICE);
            
            if (nfcManager && nfcManager.getDefaultAdapter()) {
                const nfcAdapter = nfcManager.getDefaultAdapter();
                const isEnabled = nfcAdapter.isEnabled();
                
                if (isEnabled) {
                    console.log("✅ NFC is available and enabled");
                    viewModel.set("message", "Ready - Tap your card");
                    viewModel.set("isNfcAvailable", true);
                    
                    // TODO: Implement NFC card detection when a compatible library is available
                    
                } else {
                    console.log("⚠️ NFC is available but disabled");
                    viewModel.set("message", "Please enable NFC in device settings");
                    viewModel.set("isNfcAvailable", false);
                }
            } else {
                console.log("❌ NFC is not available on this device");
                viewModel.set("message", "NFC not supported on this device");
                viewModel.set("isNfcAvailable", false);
            }
        } else {
            console.log("❌ Not running on Android");
            viewModel.set("message", "NFC only available on Android");
            viewModel.set("isNfcAvailable", false);
        }
    } catch (error) {
        console.log("❌ Error checking NFC:", error);
        viewModel.set("message", "Error checking NFC availability");
        viewModel.set("isNfcAvailable", false);
    }

    // Set the viewModel as the bindingContext for the page.
    // This is the crucial step that links the XML bindings to this code.
    page.bindingContext = viewModel;
}