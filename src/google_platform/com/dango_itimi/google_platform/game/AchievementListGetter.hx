package com.dango_itimi.google_platform.game;
class AchievementListGetter {

	public var loadedData(default, null):Dynamic;
	public var achievementList(default, null):AchievementList;

	public function new(){
	}
	public function execute(playerId:String = "me"){

		loadedData = null;

		var parameters = {
			path: [
				"/games/v1/players/", playerId,
				"/achievements"
				].join(""),
			method: "get"
		};
		untyped parameters["callback"] = onSend;
		untyped gapi.client.request(parameters);
	}
	private function onSend(data:Dynamic){

		loadedData = data;
		achievementList = new AchievementList(loadedData);
	}
}
