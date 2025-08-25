import { EventData, Page, Frame, Observable } from "@nativescript/core";

// export function onNavigationTap(args: any) {

//     const buttonName = args.data.buttonName;
//     const page = (args.object as any).page as Page;

//     page.bindingContext = {myIcon: "~/assets/pay01.png", myTitle: "Pay"};

//     const frame = page.getViewById("contentFrame") as Frame;

//     if (buttonName === "pay") 
//         frame.navigate("screens/landing-page/landing-page");
//     else if (buttonName === "history")
//         frame.navigate("screens/payment-history/payment-history");
// }
export function onNavigatingTo(args: EventData) {

  const page = args.object as Page;
  // use Observable for reactive properties
  const bindingContext = new Observable();
  bindingContext.set("myIcon", "~/assets/pay01.png");
  bindingContext.set("myTitle", "Pay HERE");
  // add more properties if needed
  page.bindingContext = bindingContext;
}

export function onNavigationTap(args: any) {

  const buttonName = args.object.buttonName; // or args.object.id / attributes
  const page = (args.object as any).page as Page;
  const frame = page.getViewById("contentFrame") as Frame;

  // DO NOT overwrite page.bindingContext here
  if (buttonName === "pay") {
    console.log("Navigating to landing page");
    //frame.navigate("screens/landing-page/landing-page");
  } else if (buttonName === "history") {
    frame.navigate("screens/payment-history/payment-history");
  }
}
