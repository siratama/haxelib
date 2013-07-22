package com.dango_itimi.google_platform.game;
class StateClearer {

	public var loadedData(default, null):Dynamic;
	private var parameters:Dynamic;

	public function new(stateKey:Int = 0, currentStateVersion:String = null){

		parameters = {
			path: [
				"/appstate/v1/states/", Std.string(stateKey), "/clear"
			].join(""),
			method: "post"
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
	}
}
