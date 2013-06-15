package com.dango_itimi.google_platform.game;
class Player {

	public var displayName(default, null):String;
	public var avatarImageUrl(default, null):String;
	public var playerId(default, null):String;

	public function new(json:Dynamic){

		displayName = json.displayName;
		avatarImageUrl = json.avatarImageUrl;
		playerId = json.playerId;
	}
}
