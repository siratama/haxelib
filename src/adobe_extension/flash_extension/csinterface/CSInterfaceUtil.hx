package flash_extension.csinterface;
class CSInterfaceUtil {
	private var csInterface:CSInterface;

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
}
