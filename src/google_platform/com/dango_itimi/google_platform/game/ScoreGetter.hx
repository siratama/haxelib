package com.dango_itimi.google_platform.game;

class ScoreGetter {

	public var loadedData(default, null):Dynamic;
	public var score(default, null):Dynamic;
	private var parameters:Dynamic;

	public function new(playerId:String, leaderBoardId:String, timeSpan:String = "ALL", includeRankType:String = "ALL"){

		parameters = {
			path: [
				"/games/v1/players/", playerId,
				"/leaderboards/", leaderBoardId,
				"/scores/", timeSpan
			].join(""),
			method: "get",
			params: {
				includeRankType: includeRankType
			}
		};
		untyped parameters["callback"] = onSend;
	}
	public function execute(){

		loadedData = null;
		score = null;

		untyped gapi.client.request(parameters);
	}
	private function onSend(data:Dynamic){

		loadedData = data;

		score = new Score();
		score.parseForGet(loadedData);
	}
}
