package com.dango_itimi.google_platform.game;
class StateGetter {

	public var loadedData(default, null):Dynamic;
	public var state(default, null):State;
	private var parameters:Dynamic;

	public function new(stateKey:Int = 0){

		parameters = {
			path: [
				"/appstate/v1/states/", Std.string(stateKey)
			].join(""),
			method: "get"
		};
		untyped parameters["callback"] = onSend;
	}
	public function execute(){

		loadedData = null;
		untyped gapi.client.request(parameters);
	}
	private function onSend(data:Dynamic){

		loadedData = data;
		state = new State(data);
	}
}
