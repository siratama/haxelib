package com.dango_itimi.google_platform.game;
class AchievementList {

	public var itemSet(default, null):Array<AchievementListItem>;
	public function new(json:Dynamic){

		itemSet = [];
		if(!json.items) return;

		var length = json.items.length;
		for(i in 0...length){
			itemSet.push(new AchievementListItem(json.items[i]));
		}
	}
}

class AchievementListItem{

	private var achievementState:String;
	public var currentSteps(default, null):Int;

	public function new(json:Dynamic){

		achievementState = json.achievementState;
		currentSteps = json.currentSteps;
	}
	public function isHidden():Bool{
		return achievementState == "HIDDEN";
	}
	public function isRevealed():Bool{
		return achievementState == "REVEALED";
	}
	public function isUnlocked():Bool{
		return achievementState == "UNLOCKED";
	}
}
