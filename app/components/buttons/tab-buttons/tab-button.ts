import { EventData, StackLayout } from "@nativescript/core";

export function onTap(args: EventData) {

    const btn = args.object as StackLayout;
    const tabName = btn.bindingContext.get("tabName");

    btn.page.notify({
        eventName: "tabTap",
        object: btn,
        data: { tabName },
    });
}
