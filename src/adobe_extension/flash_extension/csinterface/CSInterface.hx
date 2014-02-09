package flash_extension.csinterface;

@:native("CSInterface")
extern class CSInterface {
	public function new():Void;
	public function evalScript(script:String, ?callback:Void->Void):Void;
	public function getSystemPath(pathType:String):String;
}
