package com.dango_itimi.google_platform.platform;
import jQuery.JQuery;
class InteractivePostButton {

	private var parameters:Dynamic;

	public function new(elementId:String, clientId:String, contentUrl:String, cookiePolicy:String, callToActionLabel:String, callToActionUrl:String){

		new JQuery("#googleplus_button").css("display", "block");

		parameters = {
			clientid: clientId,
			contenturl: contentUrl,
			cookiepolicy: cookiePolicy,
			calltoactionlabel: callToActionLabel,
			calltoactionurl: callToActionUrl
		};
		untyped parameters["class"] = "g-interactivepost";
	}
	public function render(score:Int){

		parameters.prefilltext = score + " point get!";
		untyped gapi.interactivepost.render("googleplus_button", parameters);
	}
}
