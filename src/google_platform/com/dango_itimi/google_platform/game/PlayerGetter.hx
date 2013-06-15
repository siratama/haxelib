package com.dango_itimi.google_platform.game;
class PlayerGetter {

	public var loadedData(default, null):Dynamic;
	public var player(default, null):Player;

	public function new(){
	}
	public function execute(playerId:String = "me"){

		loadedData = null;
		player = null;

		var param = {
			path: "/games/v1/players/" + playerId
		};
		untyped param["callback"] = onLoad;

		untyped gapi.client.request(param);
	}
	private function onLoad(data:Dynamic){

		this.loadedData = data;
		player = new Player(loadedData);
	}
}
