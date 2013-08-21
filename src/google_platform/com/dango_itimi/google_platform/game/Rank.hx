package com.dango_itimi.google_platform.game;

class Rank{

	public var rank(default, null):Int;
	public var score(default, null):Int;
	public var formattedScore(default, null):String;
	public var player(default, null):Player;
	public var formattedScoreRank(default, null):String;

	public function new(json:Dynamic){

		this.rank = json.scoreRank;
		this.score = json.scoreValue;
		this.formattedScore = json.formattedScore;
		this.formattedScoreRank = json.formattedScoreRank;
		this.player = new Player(json.player);
	}
}

