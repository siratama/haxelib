package com.dango_itimi.js.event;

import com.dango_itimi.event.KeyChecker;
import js.Browser;

class KeyCheckerForJS extends KeyChecker{

	//event == null : for ie
	public function new(preventDownEvent:Bool = false){

		Browser.window.document.onkeydown = function(event:Dynamic){
			if(event == null)
				untyped event = window.event;
			down(event.keyCode);

			if(preventDownEvent){
				event.preventDefault();
				event.stopPropagation();
			}
		};

		Browser.window.document.onkeyup = function(event){
			if(event == null)
				untyped event = window.event;
			up(event.keyCode);
		};

		super();
	}
}
