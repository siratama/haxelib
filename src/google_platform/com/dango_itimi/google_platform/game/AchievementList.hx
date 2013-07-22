package com.dango_itimi.google_platform.game;
class AchievementList {

	public var itemSet(default, null):Array<AchievementListItem>;
	public var itemMap:Map<String, AchievementListItem>;
	public function new(json:Dynamic){

		itemSet = [];
		itemMap = new Map();
		if(!json.items) return;

		var length = json.items.length;
		for(i in 0...length){
			var achievementListItem = new AchievementListItem(json.items[i]);
			itemSet.push(achievementListItem);
			itemMap[achievementListItem.id] = achievementListItem;
		}
	}
}

class AchievementListItem{

	private var achievementState:String;
	public var currentSteps(default, null):Int;
	public var formattedCurrentStepsString(default, null):String;
	public var id(default, null):String;

	public function new(json:Dynamic){

		achievementState = json.achievementState;
		currentSteps = json.currentSteps;
		formattedCurrentStepsString = json.formattedCurrentStepsString;
		id = json.id;
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
