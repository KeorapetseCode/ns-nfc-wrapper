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
			
			// Set selected state for Pay button (index 0) by default
			if (index === this.selectedIndex) {
				button.className += ' selected';
			}
			
			const label = new Label();
			label.text = item.title;
			label.className = 'label';
			
			// Set selected state for label too
			if (index === this.selectedIndex) {
				label.className += ' selected';
			}
			
			button.addChild(label);
			
			// Add tap handler with navigation logic
			button.on('tap', () => {
				console.log('🔘 Navigation button tapped:', item);
				this.handleNavigation(item, index);
			});
			
			this.addChild(button);
		});
	}

	private handleNavigation(item: any, index: number) {
		// Update selected index
		this.updateSelectedIndex(index);
		
		// Handle navigation based on button type
		switch (item.buttonName) {
			case 'pay':
				// Navigate to landing page
				Frame.topmost().navigate({
					moduleName: 'screens/landing-page/landing-page',
					clearHistory: false
				});
				break;
			case 'history':
				// Navigate to payment history page
				Frame.topmost().navigate({
					moduleName: 'screens/payment-history/payment-history',
					clearHistory: false
				});
				break;
			default:
				console.log('Unknown navigation item:', item.buttonName);
		}
	}

	public updateSelectedIndex(newIndex: number) {
		// Update the selected index
		this.selectedIndex = newIndex;
		
		// Update the visual state of all buttons
		for (let i = 0; i < this.getChildrenCount(); i++) {
			const child = this.getChildAt(i) as FlexboxLayout;
			const label = child.getChildAt(0) as Label;
			
			if (i === newIndex) {
				// Selected state
				child.className = 'navigation-button-wrapper selected';
				label.className = 'label selected';
			} else {
				// Unselected state
				child.className = 'navigation-button-wrapper';
				label.className = 'label';
			}
		}
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
			// Refresh the visual state when selectedIndex changes from parent
			if (target.getChildrenCount() > 0) {
				target.updateSelectedIndex(newValue);
			}
		}
	});
}

// // Register properties for binding
NavigationBar.navItemsProperty.register(NavigationBar);
NavigationBar.selectedIndexProperty.register(NavigationBar);