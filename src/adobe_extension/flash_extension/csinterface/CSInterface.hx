package flash_extension.csinterface;

@:native("CSInterface")
extern class CSInterface {
	public function new():Void;
	public function getSystemPath(pathType:String):String;

	//script type is not String
	//example: String + static Function
	public function evalScript(script:Dynamic, ?callback:Dynamic->Void):Void;
}
