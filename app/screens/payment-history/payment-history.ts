import { EventData, Page } from '@nativescript/core';

export function onLoaded(args: EventData): void {
  const page = <Page>args.object;
  console.log('Payment History screen loaded');
}