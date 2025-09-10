import { Observable, EventData, View, Button } from '@nativescript/core';
import { Nfc, NfcNdefData } from "nativescript-nfc";

let currentAmount = '';

export function onLoaded(args: EventData): void {

    const page = args.object as View;
    const viewModel = new Observable();
    const nfc = new Nfc();

    console.log("Check availability of NFC***********************");
    nfc.available().then(avail => {
        console.log(avail ? "NFC is available" : "NFC is not available");
    });

// Listen for tag discoveries
    // nfc.setOnTagDiscoveredListener((data: NfcNdefData) => {
    //     console.log("Tag payloads:", data.message);
    // });

    viewModel.set('displayValue', '');
    page.bindingContext = viewModel;
}

export function onKeyTap(args: EventData): void {
    
    const button = args.object as Button;
    const viewModel = button.bindingContext as Observable;
    const keyValue = button.text as string;
    let currentValue = viewModel.get('displayValue') || '';
 
    //console.log('Current Value before if statement: ', currentValue);

    if (keyValue) {
        if (currentValue && currentValue.length > 0 && currentValue.length < 7) {

            if (keyValue === '←')
                currentValue = currentValue.slice(0, -1);
            else if (keyValue === '.' && currentValue.includes('.'))
                return; // Prevent multiple decimals
            else if (currentValue.includes('.') && currentValue.split('.')[1].length >= 2) 
                return; // Limit to 2 decimal places
            else
                currentValue += keyValue;
        }
        else if (!currentValue || currentValue.length === 0) {
            if (keyValue !== '←' && keyValue !== '.' && keyValue !== '0')
                currentValue += keyValue;
        }
    }
    viewModel.set('displayValue', currentValue);
    currentAmount = currentValue;
}