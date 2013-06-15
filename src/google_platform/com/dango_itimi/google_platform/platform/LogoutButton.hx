package com.dango_itimi.google_platform.platform;
import js.Browser;
import jQuery.JQuery;
class LogoutButton {

	private var element:JQuery;
	private var sendData:Dynamic;
	private var logoutUrl:String;

	public function new(elementId:String, logoutUrl:String){

		element = new JQuery(elementId);
		this.logoutUrl = logoutUrl;
	}
	public function show(accessToken:String){

		sendData = { token: accessToken };
		element.css("display", "block");
		element.click(function(event){ execute(); });
	}
	private function execute(){

		JQuery._static.ajax({
			type: "GET",
			url: logoutUrl,
			data: sendData,
			async: false,
			contentType: "application/json",
			dataType: "jsonp",
			success: function(nullResponse){
				Browser.window.location.reload();
			},
			error: function(e){
				trace(e);
			}
		});
	}
}
