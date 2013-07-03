package com.dango_itimi.mobile;
class UserAgent {
	private var userAgentString:String;
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
}
