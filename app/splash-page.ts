import { EventData, Page } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;

  setTimeout(() => {
    Frame.topmost().navigate({
        moduleName: 'main-page', // Navigate to the main app page
        clearHistory: true,
    }); // Navigate to the main app page after a delay
  }, 2000);
}