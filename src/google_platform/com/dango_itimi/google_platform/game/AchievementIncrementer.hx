package com.dango_itimi.google_platform.game;
class AchievementIncrementer {

	public var newlyUnlocked:Bool;

	public function new(){
	}
	public function execute(achievementId:String, stepsToIncrement:Int = 1){

		loadedData = null;

		var parameters = {
			path: [
				"/games/v1/achievements/", achievementId,
				"/increment"
			].join(""),
			method: "post",
			params: {
				stepsToIncrement: stepsToIncrement
			}
		};
		untyped parameters["callback"] = onSend;
		untyped gapi.client.request(parameters);
	}
	private function onSend(data:Dynamic){

		loadedData = data;
		newlyUnlocked = data.newlyUnlocked;
	}
}
