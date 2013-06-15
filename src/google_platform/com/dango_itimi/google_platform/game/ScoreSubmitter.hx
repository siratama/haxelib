package com.dango_itimi.google_platform.game;

class ScoreSubmitter {

    public var loadedData(default, null):Dynamic;
	public var score(default, null):Dynamic;
	private var leaderBoardId:String;

	public function new(leaderBoardId:String){

		this.leaderBoardId = leaderBoardId;
	}
	public function execute(score:Int){

        loadedData = null;

		var param = {
			path: [
				"/games/v1/leaderboards/", leaderBoardId,
				"/scores"
			].join(""),
			method: "post",
			params: {
				score: score
			}
		};
		untyped param["callback"] = onSend;
		untyped gapi.client.request(param);
	}
	private function onSend(data:Dynamic){

		loadedData = data;

		score = new Score();
		score.parseForSubmit(loadedData);
	}
}
