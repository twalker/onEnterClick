/* onEnterClick v1.0
 * (c) 2008 Tim Walker
 * onEnterClick is freely distributable under the terms of an MIT-style license.
 *
 * EnterClick listens on a containing element for the enter/return key being pressed.
 * When the enter key is pressed within a child input element that will submit the form, 
 * it will prevent the default form submittal and fire the click event of a designated button.
 *  
 * Usage:
 * $('fieldset_forgot').onEnterClick($('btn_forgot'));
 */
var EnterClick = Class.create({
	relevantTypes: $w('text password checkbox radio'),
	initialize: function(element, button){
		this.element = $(element).addClassName("enterclick");
		this.button = $(button);
		this.element.observe('keypress', this.__keyPress.bindAsEventListener(this));
	},
	__keyPress: function(e){
		var elSrc = e.element();
		if((e.keyCode == Event.KEY_RETURN) 
			&& (elSrc.nodeName == 'INPUT') 
			&& (this.relevantTypes.include(elSrc.type))) {
				// prevent default form submittal
				e.stop(); 
				// fire associated button's click event
				//console.log('firing ' + this.button.id);
				this.button.click();
		}
	}
});
// Extend Element with enterclick
Element.addMethods({
	onEnterClick: function(element, button) {
		new EnterClick(element, button);
		return element;
	}
});
