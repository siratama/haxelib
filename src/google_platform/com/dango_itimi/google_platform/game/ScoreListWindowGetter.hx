package com.dango_itimi.google_platform.game;

class ScoreListWindowGetter {

	public var loadedData(default, null):Dynamic;
	public var rankSet(default, null):Array<Rank>;

	public static inline var TIME_SPAN_ALL_TIME = "ALL_TIME";

	public static inline var COLLECTION_SOCIAL = "SOCIAL";
	public static inline var COLLECTION_PUBLIC = "PUBLIC";

	private var leaderBoardId:String;
	private var timeSpan:String;
	private var maxResults:Int;

	public function new(leaderBoardId:String, timeSpan:String = TIME_SPAN_ALL_TIME, maxResults:Int = 25){
		this.leaderBoardId = leaderBoardId;
		this.timeSpan = timeSpan;
		this.maxResults = maxResults;
	}
	public function executeForSocial(){
		load(COLLECTION_SOCIAL);
	}
	public function executeForPublic(){
		load(COLLECTION_PUBLIC);
	}
	private function load(collection:String){

		loadedData = null;
		rankSet = null;

		var param = {
			path: [
				"/games/v1/leaderboards/", leaderBoardId,
				"/window/", collection
			].join(""),
			method: "get",
			params: {
				timeSpan: timeSpan,
				maxResults: maxResults
			}
		};
		untyped param["callback"] = onSend;
		untyped gapi.client.request(param);
	}
	private function onSend(data:Dynamic){

		loadedData = data;

		if(loadedData.items == null) return;

		rankSet = [];
		for(i in 0...loadedData.items.length){

			var json = loadedData.items[i];
			rankSet.push(new Rank(json));
		}
	}
}

