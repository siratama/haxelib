package com.dango_itimi.php.mobile;
import com.dango_itimi.mobile.UserAgent;
class UserAgentRegister {
	public static var userAgent(default, null):UserAgent;
	public static function initialize(){

		userAgent = new UserAgent(untyped __php__("$_SERVER['HTTP_USER_AGENT']"));
	}
}
