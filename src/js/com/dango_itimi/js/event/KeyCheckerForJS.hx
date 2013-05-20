package com.dango_itimi.js.event;

import com.dango_itimi.event.KeyChecker;
import js.Lib;

class KeyCheckerForJS extends KeyChecker{

	//event == null : for ie
	public function new(){

		Lib.window.document.onkeydown = function(event){
			if(event == null)
				untyped event = window.event;
			down(event.keyCode);
		};

		Lib.window.document.onkeyup = function(event){
			if(event == null)
				untyped event = window.event;
			up(event.keyCode);
		};

		super();
	}
}
