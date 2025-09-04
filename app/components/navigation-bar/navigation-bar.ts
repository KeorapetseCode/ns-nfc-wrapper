import { FlexboxLayout, EventData, ObservableArray, Property, Frame, Label } from '@nativescript/core';

// Simple function for navigation tap events (not tied to custom class)
export function onNavigationTap(args: EventData) {
	//console.log('🔘 Navigation button tapped');
	const button = args.object as any;
	const bindingContext = button.bindingContext;
	//console.log('🎯 Tapped item data:', bindingContext);
}

export class NavigationBar extends FlexboxLayout {

	navItems: ObservableArray<any>;
	selectedIndex: number;

	constructor() {
		super();
		//console.log('✅ NavigationBar constructor initializing...');
		
		// Set FlexboxLayout properties
		this.className = 'navigation-bar';
		this.flexDirection = 'row';
		this.justifyContent = 'space-around';
		this.alignItems = 'center';
	}

	private initWithItems(items: ObservableArray<any>) {
		//console.log(`🛠️ Initializing NavigationBar with ${items.length} items`);
		
		// Clear existing children
		this.removeChildren();
		
		// Create buttons for each nav item
		items.forEach((item, index) => {
			const button = new FlexboxLayout();
			button.className = 'navigation-button-wrapper';
			
			const label = new Label();
			label.text = item.title;
			label.className = 'label';
			
			button.addChild(label);
			
			// Add tap handler
			button.on('tap', () => {
				console.log('🔘 Navigation button tapped:', item);
			});
			
			this.addChild(button);
		});
	}

	static navItemsProperty = new Property<NavigationBar, ObservableArray<any>>({
		name: 'navItems',
		defaultValue: new ObservableArray(),
		affectsLayout: true,
		valueChanged: (target: NavigationBar, oldValue, newValue) => {
			// console.log('🔄 NavItems changed!');
			// console.log('📋 New NavItems:', newValue);
			// console.log('📊 NavItems count:', newValue?.length || 0);
			target.navItems = newValue;
			if (newValue && newValue.length){
				target.initWithItems(newValue);
			}
		}
  	});

	static selectedIndexProperty = new Property<NavigationBar, number>({
		name: 'selectedIndex',
		defaultValue: 0,
		valueConverter: (v) => parseInt(v, 10),
		valueChanged: (target: NavigationBar, oldValue, newValue) => {
			target.selectedIndex = newValue;
		}
	});
}

// // Register properties for binding
NavigationBar.navItemsProperty.register(NavigationBar);
NavigationBar.selectedIndexProperty.register(NavigationBar);