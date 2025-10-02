import { EventData, Page, Observable, Application, Utils, Http } from '@nativescript/core';

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
            viewModel.set("showKeypad", true);
            viewModel.set("isNfcAvailable", true);

            // const context = Utils.ad.getApplicationContext();
            // const nfcManager = context.getSystemService(android.content.Context.NFC_SERVICE);
            
            // if (nfcManager && nfcManager.getDefaultAdapter()) {
            //     const nfcAdapter = nfcManager.getDefaultAdapter();
            //     const isEnabled = nfcAdapter.isEnabled();
                
            //     if (isEnabled) {
            //         console.log("✅ NFC is available and enabled");
            //         viewModel.set("message", "Initializing Yoco...");
            //         viewModel.set("isNfcAvailable", true);
                    
            //         // Initialize Yoco authentication after NFC check passes
            //         //initializeYocoAuth(viewModel); //Todo: move this to its own try catch
                    
            //     } else {
            //         console.log("⚠️ NFC is available but disabled");
            //         viewModel.set("message", "Please enable NFC in device settings");
            //         viewModel.set("isNfcAvailable", false);
            //     }
            // } else {
            //     console.log("❌ NFC is not available on this device");
            //     viewModel.set("message", "NFC not supported on this device");
            //     viewModel.set("isNfcAvailable", false);
            // }
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

// function initializeYocoAuth(viewModel: Observable) {

//     console.log("🔐 Initializing Yoco authentication...");

//     // TODO: Replace with your actual Yoco API credentials
//     const yocoConfig = {
//         client_id: "",
//         response_type: "code",
//         scope: "offline_access",
//         redirect_uri: "https://core.versofy.cloud", //change this to your Github account or LinkedIn profile
//         state: "random_state_string",
//     };

//     const queryParams = new URLSearchParams({
//         client_id: yocoConfig.client_id,
//         redirect_uri: yocoConfig.redirect_uri,
//         response_type: yocoConfig.response_type,
//         scope: yocoConfig.scope,
//         state: yocoConfig.state,
//     }).toString();

//     const authRequest = {
//         url: `https://iam.yocosandbox.com/oauth2/auth?${queryParams}`,
//         method: "POST",
//     };
    
//     Http.request(authRequest).then(response => {
//         console.log("ℹ️ Yoco authentication response:", response);
//         // if (response.statusCode === 200) {
//         //     const authData = response.content.toJSON();
//         //     console.log("✅ Yoco authentication successful:", authData);
            
//         //     // Store auth token for payment processing
//         //     viewModel.set("yocoAuthToken", authData.token || authData.access_token);
//         //     viewModel.set("yocoInitialized", true);
//         //     viewModel.set("message", "Ready - Tap your card");
            
//         //     // TODO: Implement NFC card detection when a compatible library is available
            
//         // } else {
//         //     console.log("❌ Yoco authentication failed:", response.statusCode);
//         //     console.log({ response })
//         //     viewModel.set("message", "Payment service unavailable");
//         //     viewModel.set("yocoInitialized", false);
            
//         // }
//     }).catch(error => {
//         console.log("❌ Yoco authentication error:", error);
//         viewModel.set("message", "Payment service connection failed");
//         viewModel.set("yocoInitialized", false);
//     });
// }