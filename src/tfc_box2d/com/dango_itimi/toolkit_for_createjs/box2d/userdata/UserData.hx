package com.dango_itimi.toolkit_for_createjs.box2d.userdata;
class UserData {

	public var key:String;

	public function new() {
	}

	public function clone():UserData {

		var userData:UserData = new UserData();
		cloneChild(userData);
		return userData;
	}
	private function cloneChild(userData:UserData) {
	}
	public function toString():String {

		return 'key: ' + key + "\n";
	}
}
