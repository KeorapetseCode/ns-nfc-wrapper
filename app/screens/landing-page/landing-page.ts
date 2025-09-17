import { EventData, Page, Observable } from '@nativescript/core';
import { Nfc } from "nativescript-nfc";

// This function is called when the page is loading.
export function navigatingTo(args: EventData) {
    // Get the Page instance from the event arguments.
    const page = <Page>args.object;

    // Create a new Observable. This will be our view model.
    // An Observable is an object that can notify the UI when its properties change.
    const viewModel = new Observable();
    const nfc = new Nfc();
    
    console.log("🔍 Checking NFC availability...");

    nfc.available().then(nfcAvailable => {
        if (true) { //brute forced for testing purposes
            console.log("✅ NFC is available");
            viewModel.set("message", "Tap To Pay");
            viewModel.set("isNfcAvailable", true);
            //viewModel.set("showKeypad", true);
            
            // Start NFC listener
            nfc.setOnNdefDiscoveredListener((data) => {
                console.log("💳 NFC Card detected!", data);
                viewModel.set("message", "Card detected! Processing payment...");
                processNfcPayment(data, viewModel);
            }).then(() => {
                console.log("🎧 NFC listener started successfully");
            }).catch(err => {
                console.log("❌ Failed to start NFC listener:", err);
            });
            
        } else {
            console.log("❌ NFC is not available");
            viewModel.set("message", "NFC is not available on this device");
            viewModel.set("isNfcAvailable", false);
            viewModel.set("showKeypad", false);
        }
    }).catch(err => {
        console.log("❌ Error checking NFC availability:", err);
        viewModel.set("message", "Unable to check NFC availability");
        viewModel.set("isNfcAvailable", false);
        viewModel.set("showKeypad", false);
    });

    // Manual pay button (only works when NFC is available)
    viewModel.set("onPay", () => {
        if (viewModel.get("isNfcAvailable")) {
            console.log("💰 Manual Pay button tapped!");
            viewModel.set("message", "Processing manual payment...");
            processManualPayment(viewModel);
        } else {
            viewModel.set("message", "Payment not available - NFC required");
        }
    });

    // Set the viewModel as the 'bindingContext' for the page.
    // This is the crucial step that links the XML bindings to this code.
    page.bindingContext = viewModel;
}

function processNfcPayment(nfcData: any, viewModel: Observable) {
    console.log("🔄 Processing NFC payment with data:", nfcData);
    
    // TODO: Get amount from keypad component
    // TODO: Send to your dummy_api.com
    
    setTimeout(() => {
        viewModel.set("message", "NFC Payment successful! ✅");
        console.log("✅ NFC Payment completed");
    }, 2000);
}

function processManualPayment(viewModel: Observable) {
    console.log("🔄 Processing manual payment");
    
    // TODO: Get amount from keypad component
    // TODO: Send to your dummy_api.com
    
    setTimeout(() => {
        viewModel.set("message", "Manual payment successful! ✅");
        console.log("✅ Manual payment completed");
    }, 2000);
}