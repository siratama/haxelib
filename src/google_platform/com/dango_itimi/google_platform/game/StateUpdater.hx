package com.dango_itimi.google_platform.game;
class StateUpdater {

	public var loadedData(default, null):Dynamic;
	public var state(default, null):State;
	private var parameters:Dynamic;

	public function new(data:String, stateKey:Int = 0, currentStateVersion:String = null){

		parameters = {
			path: [
				"/appstate/v1/states/", Std.string(stateKey)
			].join(""),
			method: "put",
			body: {
				kind: 'appstate#updateRequest',
				data: data
			}
		};

		if(currentStateVersion != null){

			var params = { currentStateVersion: currentStateVersion };
			untyped parameters["params"] = params;
		}

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
