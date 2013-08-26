package com.dango_itimi.js;

import com.dango_itimi.js.event.KeyCheckerForJS;
import com.dango_itimi.as3_and_createjs.CommonClassSet;

class CommonClassRegister {
	public static function initialize(){

		CommonClassSet.keyCheckerClass = KeyCheckerForJS;
	}
}
