package com.dango_itimi.google_platform.game;
class AchievementUnlocker {

	public var loadedData(default, null):Dynamic;

	public function new(){
	}
	public function execute(achievementId:String){

		loadedData = null;

		var param = {
			path: [
				"/games/v1/achievements/", achievementId,
				"/unlock"
			].join(""),
			method: "post"
		};
		untyped param["callback"] = onSend;
		untyped gapi.client.request(param);
	}
	private function onSend(data:Dynamic){

		loadedData = data;
	}
}
