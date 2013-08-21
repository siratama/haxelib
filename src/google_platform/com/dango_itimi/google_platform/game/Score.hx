package com.dango_itimi.google_platform.game;

import com.dango_itimi.google_platform.game.Score.ScorePair;
class ScorePair{
	public var numerical:Int;
	public var formatted:String;
	public function new(numerical:Int, formatted:String){
		this.numerical = numerical;
		this.formatted = formatted;
	}
}
class Score {

	public static inline var ALL_TIME = "ALL_TIME";
	public static inline var WEEKLY = "WEEKLY";
	public static inline var DAILY = "DAILY";

	public var allTime(default, null):ScorePair;
	public var weekly(default, null):ScorePair;
	public var daily(default, null):ScorePair;

	public function new(){
	}

	//
	public function parseForGet(json:Dynamic){

		allTime = getBestScoreForGet(json, ALL_TIME);
		weekly = getBestScoreForGet(json, WEEKLY);
		daily = getBestScoreForGet(json, DAILY);
	}
	private function getBestScoreForGet(json:Dynamic, key:String):ScorePair{

		for(i in 0...json.items.length){
			var json = json.items[i];
			if(json.timeSpan == key)
				return new ScorePair(json.scoreValue, json.scoreString);
		}
		return null;
	}

	//
	public function parseForSubmit(json:Dynamic){

		allTime = getBestScoreForSubmit(json, ALL_TIME);
		weekly = getBestScoreForSubmit(json, WEEKLY);
		daily = getBestScoreForSubmit(json, DAILY);
	}
	private function getBestScoreForSubmit(json:Dynamic, key:String):ScorePair{

		if(existsInBeatenScoreTimeSpans(json, key))
			return new ScorePair(cast json.formattedScore, json.formattedScore);
		else{
			var json = getJsonInUnbeatenScores(json, key);
			return new ScorePair(json.score, json.formattedScore);
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
