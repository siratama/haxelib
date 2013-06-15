package com.dango_itimi.google_platform.game;
class Score {

	public static inline var ALL_TIME = "ALL_TIME";
	public static inline var WEEKLY = "WEEKLY";
	public static inline var DAILY = "DAILY";

	public var allTime(default, null):Int;
	public var weekly(default, null):Int;
	public var daily(default, null):Int;

	public function new(){

	}

	//
	public function parseForGet(json:Dynamic){

		allTime = getBestScoreForGet(json, ALL_TIME);
		weekly = getBestScoreForGet(json, WEEKLY);
		daily = getBestScoreForGet(json, DAILY);
	}
	private function getBestScoreForGet(json:Dynamic, key:String):Int{

		for(i in 0...json.items.length){
			var json = json.items[i];
			if(json.timeSpan == key)
				return json.scoreValue;
		}
		return 0;
	}

	//
	public function parseForSubmit(json:Dynamic){

		allTime = getBestScoreForSubmit(json, ALL_TIME);
		weekly = getBestScoreForSubmit(json, WEEKLY);
		daily = getBestScoreForSubmit(json, DAILY);
	}
	private function getBestScoreForSubmit(json:Dynamic, key:String):Int{

		if(existsInBeatenScoreTimeSpans(json, key))
			return cast json.formattedScore;
		else{
			var json = getJsonInUnbeatenScores(json, key);
			return json.score;
		}
	}
	private function existsInBeatenScoreTimeSpans(json:Dynamic, key:String){

		if(json.beatenScoreTimeSpans == null)
			return false;

		for(i in 0...json.beatenScoreTimeSpans.length){
			if(json.beatenScoreTimeSpans[i] == key)
				return true;
		}
		return false;
	}
	private function getJsonInUnbeatenScores(json:Dynamic, key:String):Dynamic{

		for(i in 0...json.unbeatenScores.length){
			var json = json.unbeatenScores[i];
			if(json.timeSpan == key)
				return json;
		}
		return null;
	}
}
