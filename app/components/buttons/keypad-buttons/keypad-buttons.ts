import { Observable, EventData, View, Button } from '@nativescript/core';

export function onLoaded(args: EventData): void {

    const page = args.object as View;
    const viewModel = new Observable();

    viewModel.set('displayValue', '');
    page.bindingContext = viewModel;
}

export function onKeyTap(args: EventData): void {
    
    const button = args.object as Button;
    const viewModel = button.bindingContext as Observable;
    const keyValue = button.text as string;
    let currentValue = viewModel.get('displayValue') as string;

    if (keyValue === '←') {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue += keyValue;
    }   
  viewModel.set('displayValue', currentValue);
}