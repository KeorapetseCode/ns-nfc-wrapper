import { FlexboxLayout, EventData, ObservableArray, Property, Frame } from '@nativescript/core';

export class NavigationBar extends FlexboxLayout {

  static navItemsProperty = new Property<NavigationBar, ObservableArray<any>>({
    name: 'navItems',
    defaultValue: new ObservableArray(),
    affectsLayout: true
  });

  static selectedIndexProperty = new Property<NavigationBar, number>({
    name: 'selectedIndex',
    defaultValue: 0,
    valueConverter: (v) => parseInt(v)
  });

  navItems: ObservableArray<any>;
  selectedIndex: number;

  constructor() {
    super();
    console.log('✅ NavigationBar initialized');
    // You can set default navItems here if not passed from parent
  }

  onNavigationTap(args: EventData) {

    const button = args.object as any;
    const buttonName = button.buttonName;
    const index = this.navItems.indexOf(this.navItems.find(item => item.buttonName === buttonName));

    if (index !== -1) {
      this.selectedIndex = index; // Sync with BottomNavigation
      console.log(`Navigating to ${buttonName} tab`);

      // Get the root frame for nested navigation (adjust IDs as needed)
      const rootPage = this.page;
      const bottomNav = rootPage.getViewById('bottomNav') as any;
      const activeFrameId = index === 0 ? 'payFrame' : 'historyFrame'; // Map to your frames
      const activeFrame = bottomNav.getViewById(activeFrameId) as Frame;

      if (activeFrame) {
        if (buttonName === 'pay') {
          activeFrame.navigate('screens/landing-page/landing-page');
        } else if (buttonName === 'history') {
          activeFrame.navigate('screens/payment-history/payment-history');
        }
      } else {
        console.error('❌ Could not find active frame');
      }
    }
  }
}

// Register properties for binding
NavigationBar.navItemsProperty.register(NavigationBar);
NavigationBar.selectedIndexProperty.register(NavigationBar);