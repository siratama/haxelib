package com.dango_itimi.google_platform.platform;
class ActivitySender {

	public var loadedData(default, null):Dynamic;
	public var newlyUnlocked(default, null):Bool;

	public function new(){
	}
	public function execute(moment:Dynamic, clientId:String = "me"){

		var body = untyped JSON.stringify(moment);

		var parameters = {
			path: [
				"plus/v1/people/", clientId,
				"/moments/vault"
			].join(""),
			method: 'POST',
			body: body
		};
		untyped parameters["callback"] = onSend;
		untyped gapi.client.request(parameters);
	}
	private function onSend(data:Dynamic){
		loadedData = data;
		newlyUnlocked = loadedData.newlyUnlocked;
	}
}
