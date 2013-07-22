package com.dango_itimi.google_platform.game;
class State {

	public var stateKey(default, null):Int;
	public var currentStateVersion:String;
	public var data:String;

	public function new(json:Dynamic){
		stateKey = json.stateKey;
		currentStateVersion = json.currentStateVersion;
		data = json.data;
	}
}
