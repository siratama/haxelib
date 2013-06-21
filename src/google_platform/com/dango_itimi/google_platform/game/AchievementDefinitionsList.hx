package com.dango_itimi.google_platform.game;
class AchievementDefinitionsList {

	public var itemSet(default, null):Array<AchievementDefinitionsListItem>;
	public function new(json:Dynamic){

		itemSet = [];
		if(!json.items) return;

		var length = json.items.length;
		for(i in 0...length){
			itemSet.push(new AchievementDefinitionsListItem(json.items[i]));
		}
	}
}
class AchievementDefinitionsListItem {

	public var kind(default, null):String;
	public var id(default, null):String;
	public var name(default, null):String;
	public var description(default, null):String;
	public var achievementType(default, null):String;
	public var totalSteps(default, null):Int;
	public var formattedTotalSteps(default, null):String;
	public var isRevealedIconUrlDefault(default, null):Bool;
	public var isUnlockedIconUrlDefault(default, null):Bool;
	public var revealedIconUrl(default, null):String;
	public var unlockedIconUrl(default, null):String;
	public var initialState(default, null):String;

	public function new(json:Dynamic){

		kind = json.kind;
		id = json.id;
		name = json.name;
		description = json.description;
		achievementType = json.achievementType;
		totalSteps = json.totalSteps;
		formattedTotalSteps = json.formattedTotalSteps;
		isRevealedIconUrlDefault = json.isRevealedIconUrlDefault;
		isUnlockedIconUrlDefault = json.isUnlockedIconUrlDefault;
		revealedIconUrl = json.revealedIconUrl;
		unlockedIconUrl = json.unlockedIconUrl;
		initialState = json.initialState;
	}
}
