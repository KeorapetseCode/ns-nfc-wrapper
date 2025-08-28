import { FlexboxLayout, EventData, ObservableArray, Property, Frame } from '@nativescript/core';

export class NavigationBar extends FlexboxLayout {

	static navItemsProperty = new Property<NavigationBar, ObservableArray<any>>({
		name: 'navItems',
		defaultValue: new ObservableArray(),
		affectsLayout: true,
		valueChanged: (target: NavigationBar, oldValue, newValue) => {
		console.log('🔄 NavItems changed!');
		console.log('📋 New NavItems:', newValue);
		console.log('📊 NavItems count:', newValue?.length || 0);
		
		// Log individual items
		if (newValue && newValue.length > 0) {
			newValue.forEach((item, index) => {
			console.log(`📌 NavItem ${index}:`, item);
			});
		}
		}
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
		console.log('✅ NavigationBar initialized through constructor#################################');
		// You can set default navItems here if not passed from parent
	}
}

// // Register properties for binding
NavigationBar.navItemsProperty.register(NavigationBar);
NavigationBar.selectedIndexProperty.register(NavigationBar);

// // Register the component
// export function createNavigationBar(): NavigationBar {
//   console.log('🏭 Creating NavigationBar instance');
//   return new NavigationBar();
// }

// // Export function for the XML loaded event
export function onLoaded(args: EventData) {

	console.log('📱 NavigationBar XML loaded. Printing from&&&&&&&&&&&&&&&&&&&&&&&');
	const navigationBar = args.object as FlexboxLayout;
	
	// This is where the XML FlexboxLayout becomes available
	// You can access navItems here if they're bound
	console.log('🔍 NavigationBar data context:', navigationBar.bindingContext);
	
	// Try to access the bound properties directly
	console.log('📊 Direct navItems:', navigationBar.get('navItems'));
	console.log('🎯 Direct selectedIndex:', navigationBar.get('selectedIndex'));
	
	// Set up a timeout to check data after binding is established
	setTimeout(() => {
		console.log('⏰ After timeout - bindingContext:', navigationBar.bindingContext);
		console.log('⏰ After timeout - navItems:', navigationBar.get('navItems'));
		console.log('⏰ After timeout - selectedIndex:', navigationBar.get('selectedIndex'));
	}, 100);
}