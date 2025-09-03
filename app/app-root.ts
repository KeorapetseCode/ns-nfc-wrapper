import { EventData, Observable, Page } from '@nativescript/core';

export function onPageLoaded(args: EventData) {
    
    const page = args.object as Page;
    const vm = new Observable();

    vm.set('navItems', [
        { title: 'Pay', buttonName: 'pay' },
        { title: 'Pending Payment', buttonName: 'pending' },
        { title: 'History', buttonName: 'history' }
    ]);

    vm.set('selectedIndex', 0); // Initial tab
    page.bindingContext = vm;
}