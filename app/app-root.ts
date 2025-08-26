import { EventData, Observable, Frame, Page } from '@nativescript/core';

export function onPageLoaded(args: EventData) {
    
    const page = args.object as Page;
    const vm = new Observable();

    vm.set('navItems', [
        { icon: '~/assets/pay01.png', title: 'Pay', buttonName: 'pay' },
        { icon: '~/assets/payment_history01.png', title: 'History', buttonName: 'history' }
    ]);

    vm.set('selectedIndex', 0); // Initial tab
    page.bindingContext = vm;
}