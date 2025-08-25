import { EventData, StackLayout } from "@nativescript/core";

export function onTap(args: EventData) {

    const btn = args.object as StackLayout;
    const buttonName = btn.bindingContext.get("buttonName");

    btn.page.notify({
        eventName: "tabTap",
        object: btn,
        data: { buttonName },
    });
}
