package com.dango_itimi.google_platform.platform;
import jQuery.JQuery;
class Logout {

	private var logoutUrl:String;
	public var finished(default, null):Bool;
	public var accessToken(null, default):String;

	public function new(logoutUrl:String){

		this.logoutUrl = logoutUrl;
	}

	public function setAccessToken(accessToken:String){
		this.accessToken = accessToken;
	}

	public function execute(){

		finished = false;
		var sendData = { token: accessToken };

		JQuery._static.ajax({
			type: "GET",
			url: logoutUrl,
			data: sendData,
			async: false,
			contentType: "application/json",
			dataType: "jsonp",
			success: function(nullResponse){
				finished = true;
			},
			error: function(e){
				trace(e);
			}
		});
	}
}
