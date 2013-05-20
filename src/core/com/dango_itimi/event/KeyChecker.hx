package com.dango_itimi.event;
class KeyChecker {

	private var downedKeyMap:Hash<Bool>;
	private var uppedKeyMap:Hash<Bool>;

	public function new(){

		initialize();
	}
	public function initialize(){
		downedKeyMap = new Hash();
		uppedKeyMap = new Hash();
	}
	private function down(keyCode:Int){
		downedKeyMap.set(cast keyCode, true);
	}
	private function up(keyCode:Int){
		uppedKeyMap.set(cast keyCode, true);
		downedKeyMap.remove(cast keyCode);
	}
	public function isDowned(keyCode:Int):Bool{
		return downedKeyMap.exists(cast keyCode);
	}
	public function isUpped(keyCode:Int):Bool{
		return uppedKeyMap.exists(cast keyCode);
	}
	public function isDownedAnyKey():Bool{

	    for(key in downedKeyMap){
			return true;
		}
		return false;
	}
}
