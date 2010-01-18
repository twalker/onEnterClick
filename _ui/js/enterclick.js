// onEnterClick v1.0
// (c) 2008 Tim Walker
// onEnterClick is freely distributable under the terms of an MIT-style license.

/**
 *  class EnterClick
 *
 *  [[EnterClick]] listens on a containing element for the enter/return key
 *  being pressed. When the enter key is pressed within a child input element
 *  that will submit the form, it will prevent the default form submittal and
 *  fire `callback`.
 *  
 *  Usage:
 *  $('fieldset_forgot').onEnterClick($('btn_Forgot'));
 *  $('fieldset_forgot').onEnterClick(function(e) { console.log("Yay!"); });
**/
var EnterClick = Class.create({
	relevantTypes: $w('text password checkbox radio'),

	/**
	 *  new EnterClick(@element, callback);
	**/
	initialize: function(element, callback) {
		this.element = $(element).addClassName("enterclick");

		if (Object.isFunction(callback)) {
			this.callback = callback;
		} else if (Object.isElement(callback)) {
			var name = callback.nodeName,
			    type = callback.type;
			if (name == "BUTTON" || (name == "INPUT" && (type == "submit" || type == "button"))) {
				this.callback = callback;
			}
		}
		if (!this.callback) throw new Error("Invalid callback");

		this.element.observe('keypress', function(e) {
			var src = e.element();
			if((e.keyCode == Event.KEY_RETURN) 
				&& (src.nodeName == 'INPUT') 
				&& (this.relevantTypes.include(src.type))) {
					e.stop(); 
					if (Object.isFunction(this.callback)) {
						this.callback(e);
					} else this.callback.click();
			}
		}.bindAsEventListener(this));
	},
	toString: function() { return "[object EnterClick]"; }
});

Element.addMethods({
	/**
	 *  Element.onEnterClick(@element, callback) -> Element
	 *  - callback (Element|Function): The button to click or function to call when the "Enter" key is pressed.
	 *
	 *  When the "ENTER" key is pressed while focused on any child text,
	 *  password, checkbox or radio inputs, the `callback` is invoked. If
	 *  `callback` is a button or input of type `submit` or `button`, its
	 *  `click` method is invoked. If `callback` is a [[Function]], it is
	 *  invoked and the Key event is passed as it's argument.
	**/
	onEnterClick: function(element, callback) {
		new EnterClick(element, callback);
		return element;
	}
});