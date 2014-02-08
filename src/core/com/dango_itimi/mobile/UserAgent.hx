package com.dango_itimi.mobile;
class UserAgent {

	public static inline var ANDROID = "Android";
	private var userAgentString:String;

	public static function create(){

		var userAgent = null;

		#if js
		userAgent = new UserAgent(js.Browser.navigator.userAgent);
		#end

		return userAgent;
	}

	public function new(userAgentString:String){
		this.userAgentString = userAgentString;
	}
	public function isDocomo():Bool{
		return ~/^DoCoMo/.match(userAgentString);
	}
	public function isSoftbank():Bool{
		return ~/^J-PHONE|^Vodafone|^SoftBank/.match(userAgentString);
	}
	public function isAu():Bool{
		return ~/^UP.Browser|^KDDI/.match(userAgentString);
	}

	public function isAndroid():Bool{
		return ~/Android/.match(userAgentString);
	}
	public function isAndroidTablet():Bool{
		return isAndroid() && ~/Mobile/.match(userAgentString);
	}
	public function isIPhone():Bool{
		return ~/iPhone/.match(userAgentString);
	}
	public function isIPod():Bool{
		return ~/iPod/.match(userAgentString);
	}
	public function isIPad():Bool{
		return ~/iPad/.match(userAgentString);
	}

	public function isSmartPhone():Bool{
		return isAndroid() || isIPhone() || isIPod();
	}

	public function getAndroidVersion():Float{

		return Std.parseFloat(userAgentString.substr(
			userAgentString.indexOf(ANDROID) + '$ANDROID '.length, "*.*".length));
	}
}
