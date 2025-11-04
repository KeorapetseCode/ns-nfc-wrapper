// import { EventData, Page, Observable } from '@nativescript/core';

// export function navigatingTo(args: EventData) {
//     const page = <Page>args.object;
//     const viewModel = new Observable();

//     // Login provider handlers
//     viewModel.set("onGoogleLogin", () => {
//         console.log("🔐 Google login tapped");
//         handleSocialLogin("google", viewModel);
//     });

//     viewModel.set("onFacebookLogin", () => {
//         console.log("🔐 Facebook login tapped");
//         handleSocialLogin("facebook", viewModel);
//     });

//     viewModel.set("onMicrosoftLogin", () => {
//         console.log("🔐 Microsoft login tapped");
//         handleSocialLogin("microsoft", viewModel);
//     });

//     viewModel.set("onYahooLogin", () => {
//         console.log("🔐 Yahoo login tapped");
//         handleSocialLogin("yahoo", viewModel);
//     });

//     page.bindingContext = viewModel;
// }

// function handleSocialLogin(provider: string, viewModel: Observable) {
//     console.log(`🔐 Initiating ${provider} login...`);
    
//     // TODO: Implement actual social login logic here
//     // For now, simulate login process
    
//     setTimeout(() => {
//         console.log(`✅ ${provider} login successful`);
//         // Navigate to main app after successful login
//         // frame.topmost().navigate("screens/landing-page/landing-page");
//     }, 1500);
// }
