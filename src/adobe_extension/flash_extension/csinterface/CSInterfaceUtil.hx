package flash_extension.csinterface;
import jsfl.EventType;
import jsfl.PersistentDataType;
class CSInterfaceUtil {
	public var csInterface(default, null):CSInterface;

	public static function create():CSInterfaceUtil{
		return new CSInterfaceUtil(new CSInterface());
	}
	public function new(csInterface:CSInterface){
		this.csInterface = csInterface;
	}
	public function runJsflScript(jsflUri:String){
		csInterface.evalScript('fl.runScript("$jsflUri")');
	}
	public function flTrace(text:String){
		csInterface.evalScript('fl.trace("$text")');
	}
	public function getExtensionUri():String{
		return "file:///" + csInterface.getSystemPath(SystemPath.EXTENSION);
	}
	public function evalScript(script:Dynamic, ?callback:Dynamic->Void){
		csInterface.evalScript(script, callback);
	}
	public function addDataToDocument(key:String, dataType:PersistentDataType, data:String){

		csInterface.evalScript('document.addDataToDocument("$key", "$dataType", "$data");');
	}
	public function getDataFromDocument(key:String, callback:Dynamic->Void){
		csInterface.evalScript('document.getDataFromDocument("$key");', callback);
	}

	public function addEventListener(eventType:EventType, callbackCode:String, ?callback:Dynamic->Void){
		csInterface.evalScript(
			'fl.addEventListener("$eventType", function(){ $callbackCode });', callback);
	}
}
