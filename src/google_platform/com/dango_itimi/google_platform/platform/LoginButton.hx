package com.dango_itimi.google_platform.platform;

import jQuery.JQuery;
class LoginButton {

	public var authResult(default, null):Dynamic;
	public var finished(default, null):Bool;
	private var element:JQuery;
	private var parameters:Dynamic;

	public function new(elementId:String, clientId:String, scope:String, cookiePolicy:String, requestVisibleActions:String){

		element = new JQuery();

		parameters = {
			clientid: clientId,
			scope: scope,
			cookiepolicy: cookiePolicy,
			requestvisibleactions: requestVisibleActions
		};
		untyped parameters["class"] = "g-signin";
		untyped parameters["callback"] = finishAuthorization;
	}
    public function authByRendering(){

        untyped gapi.interactivepost.render("login_button", parameters);
    }
	public function show(){
		element.css("display", "block");
	}
	public function hide(){
		element.css("display", "none");
	}
	public function initialize(){

		finished = false;
		authResult = null;
	}
	private function finishAuthorization(authResult:Dynamic){

		this.authResult = authResult;
		finished = true;
	}
	public function isSuccess():Bool{

		return authResult != null && !authResult.error;
	}
	public function isError():Bool{

		return authResult == null || authResult.error != null;
	}
}
