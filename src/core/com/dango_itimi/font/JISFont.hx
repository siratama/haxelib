package com.dango_itimi.font;
class JISFont {

	private var text:String;
	private var map:Map<String, Int>;

	public function new(?mapCreation:Bool = true){

		if(mapCreation)
			createMap();
	}
	public function createMap(){

		map = new Map();
		for(i in 0...text.length)
			map.set(text.charAt(i), i);
	}
	public function getIndex(character:String):Int{

		return (map.exists(character)) ? map.get(character) : -1;
	}
	public function getIndexSet(text:String):Array<Int>{

		var indexSet:Array<Int> = [];
		for(i in 0...text.length)
			indexSet.push(getIndex(text.charAt(i)));

		return indexSet;
	}

}
