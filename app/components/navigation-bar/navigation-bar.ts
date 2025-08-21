import { EventData, Page, Frame } from "@nativescript/core";

export function onTabTap(args: any) {

    const tabName = args.data.tabName;
    const page = (args.object as any).page as Page;
    const frame = page.getViewById("contentFrame") as Frame;

    if (tabName === "pay") 
        frame.navigate("screens/landing-page/landing-page");
    else if (tabName === "history")
        frame.navigate("screens/payment-history/payment-history");
}
