package com.dango_itimi.google_platform.game;
class AchievementDefinitionsListGetter {

	public var loadedData(default, null):Dynamic;
	public var achievementDefinitionsList(default, null):AchievementDefinitionsList;

	public function new(){
	}
	public function execute(){

		loadedData = null;

		var parameters = {
			path: "/games/v1/achievements",
			method: "get"
		};
		untyped parameters["callback"] = onSend;
		untyped gapi.client.request(parameters);
	}
	private function onSend(data:Dynamic){

		loadedData = data;
		achievementDefinitionsList = new AchievementDefinitionsList(loadedData);
	}
}
