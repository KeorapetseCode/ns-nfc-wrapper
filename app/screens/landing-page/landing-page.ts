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
    
    // console.log("Check availability of NFC***********************");
    nfc.available().then(avail => {
        // 1. Set the initial text for the 'message' Label.
        if (avail)
            viewModel.set("message", "Enter amount, then tap to Pay");
        
        else
            viewModel.set("message", "NFC is not available on this device");       
    });

    // 2. Define the 'onPay' function for the button's tap event.
    // The XML has: <btn:tab-button ... tap="{{ onPay }}" />
    viewModel.set("onPay", () => {
        //console.log("Pay button was tapped!");
        viewModel.set("message", "Processing payment...");
        // You would add your navigation or payment logic here.
    });

    // Set the viewModel as the 'bindingContext' for the page.
    // This is the crucial step that links the XML bindings to this code.
    page.bindingContext = viewModel;
}