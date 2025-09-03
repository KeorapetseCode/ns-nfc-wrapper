import { EventData } from "@nativescript/core";

export function onTap(args: EventData) {
  args.object.notify({ eventName: "tap", object: args.object });
}