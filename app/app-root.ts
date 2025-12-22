import { EventData, Observable, Page } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import { Auth } from '@nativescript/firebase-auth';

export function onPageLoaded(args: EventData) {

    const page = args.object as Page;
    const vm = new Observable();

    // Initialize authentication state
    vm.set("isAuthenticated", true); //Change this to true to simulate logged in
    vm.set("selectedIndex", 0);
    // Initialize Firebase first
    console.log("🔥 Initializing Firebase Core...");
    // firebase().initializeApp().then(() => {

    //     console.log("✅ Firebase Core initialized successfully");

    //     // Initialize Firebase Auth
	// console.log("🔐 Initializing Firebase Auth...");
    //     return firebase().auth().addAuthStateChangeListener((user) => {
    //         if (user) {
    //             console.log("✅ User is authenticated:", user.email);
    //             vm.set("isAuthenticated", true);
    //         } else {
    //             console.log("❌ User is not authenticated");
    //             vm.set("isAuthenticated", false);
    //         }
    //     });
    // }).catch(error => {
    //     console.log("❌ Firebase initialization failed:", error);
    //     // Still show login screen even if Firebase fails
    //     vm.set("isAuthenticated", false);
    // });

    vm.set('navItems', [
        { title: 'Pay', buttonName: 'pay' },
        { title: 'History', buttonName: 'history' }
    ]);
	vm.set('selectedIndex', 0); // Initial active tab

    // Login provider handlers
    // vm.set("onYahooLogin", () => {
    //     console.log("🔐 Yahoo login tapped");
    //     handleSocialLogin("yahoo", vm);
    // });

    // Navigation handler
    vm.set("onTabSelected", (args: any) => {
        console.log("📱 Tab selected:", args.newIndex);
        vm.set("selectedIndex", args.newIndex);
    });

    page.bindingContext = vm;
}

// function handleSocialLogin(provider: string, viewModel: Observable) {
//     console.log(`🔐 Initiating ${provider} login...`);
    
//     // TODO: Implement actual social login logic here with Firebase Auth
//     // For now, simulate login process
    
//     setTimeout(() => {
//         console.log(`✅ ${provider} login successful`);
//         // Simulate successful authentication
//         viewModel.set("isAuthenticated", true);
//     }, 1500);
// }
