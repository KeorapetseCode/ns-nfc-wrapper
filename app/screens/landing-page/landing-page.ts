import { EventData, Page } from '@nativescript/core'
import { HelloWorldModel } from './landing-page-model'

export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = new HelloWorldModel()
}
